// AI Market - global script
// Handles theme toggle, mobile nav, active menu highlight,
// Google Analytics events and basic chatbot

(function () {
  const html = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotPanel = document.getElementById("chatbotPanel");

  // -------- THEME SETUP --------

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
      trackEvent("theme_toggle", isLight ? "light" : "dark");
    });
  }

  // -------- MOBILE NAV TOGGLE --------

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      const open = nav.classList.contains("nav-open");
      trackEvent("menu_toggle", open ? "open" : "close");
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

  // -------- GOOGLE ANALYTICS EVENTS --------

  function trackEvent(action, label) {
    if (typeof window.gtag === "function") {
      window.gtag("event", action, {
        event_category: "engagement",
        event_label: label || action,
      });
    }
  }

  // Bind to elements with data-ga-event
  document.querySelectorAll("[data-ga-event]").forEach((el) => {
    el.addEventListener("click", () => {
      const action = el.getAttribute("data-ga-event");
      const label =
        el.getAttribute("data-ga-label") || el.textContent.trim() || action;
      trackEvent(action, label);
    });
  });

  // -------- SIMPLE CHATBOT --------

  if (chatbotToggle && chatbotPanel) {
    const messages = chatbotPanel.querySelector(".chatbot-messages");
    const closeBtn = chatbotPanel.querySelector(".chatbot-close");

    function appendMessage(text, from = "bot") {
      if (!messages) return;
      const div = document.createElement("div");
      div.className =
        "chatbot-msg " +
        (from === "user" ? "chatbot-msg-user" : "chatbot-msg-bot");
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    // Initial greeting
    appendMessage("Hi! I’m the AI Market helper bot. Tap a question below to learn more.");

    chatbotToggle.addEventListener("click", () => {
      const open = chatbotPanel.classList.toggle("open");
      trackEvent("chatbot_toggle", open ? "open" : "close");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        chatbotPanel.classList.remove("open");
        trackEvent("chatbot_toggle", "close_button");
      });
    }

    // Quick question buttons
    chatbotPanel.querySelectorAll("[data-bot-question]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-bot-question") || "";
        const a = btn.getAttribute("data-bot-answer") || "";
        if (q) appendMessage(q, "user");
        if (a) appendMessage(a, "bot");
        trackEvent("chatbot_question_click", q);
      });
    });
  }
})();
