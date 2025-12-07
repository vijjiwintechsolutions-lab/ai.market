// AI Market - global script
// Handles theme toggle, mobile nav and active menu highlight

(function () {
  const html = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  // -------- THEME SETUP --------

  // Read saved theme from localStorage
  const savedTheme = localStorage.getItem("aimarket-theme");
  if (savedTheme === "light") {
    html.classList.add("light-theme");
  }

  function updateThemeIcon() {
    if (!themeBtn) return;
    const isLight = html.classList.contains("light-theme");
    themeBtn.textContent = isLight ? "☀️" : "🌙";
  }

  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      html.classList.toggle("light-theme");
      const isLight = html.classList.contains("light-theme");
      localStorage.setItem("aimarket-theme", isLight ? "light" : "dark");
      updateThemeIcon();
    });
  }

  // -------- MOBILE NAV TOGGLE --------

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
    });
  }

  // -------- ACTIVE NAV LINK HIGHLIGHT --------

  if (nav) {
    const current = window.location.pathname.split("/").pop() || "index.html";

    nav.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      if (href === current || (href === "index.html" && current === "")) {
        a.classList.add("active");
      }
    });
  }
})();
