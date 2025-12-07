<script>
  // Simple guard: if user is NOT logged in, redirect to login page
  document.addEventListener("DOMContentLoaded", function () {
    if (!window.aiAuthOnChange) {
      console.error("Auth not initialized");
      return;
    }

    window.aiAuthOnChange(function (user) {
      const isLoginPage = window.location.pathname.endsWith("login.html");

      if (!user && !isLoginPage) {
        // Not logged in → send to login
        window.location.href = "login.html";
      }

      if (user && isLoginPage) {
        // Already logged in → go to main site
        window.location.href = "index.html";
      }
    });
  });
</script>
