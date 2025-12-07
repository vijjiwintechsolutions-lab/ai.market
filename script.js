// script.js

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  // ---- helpers ----
  const safeGtag = (eventName, params = {}) => {
    if (typeof gtag === "function") {
      gtag("event", eventName, params);
    } else {
      // Uncomment if you want to debug in console
      // console.warn("gtag not defined yet, event skipped:", eventName);
    }
  };

  // ---- Theme (dark / light) ----
  const savedTheme = localStorage.getItem("aimarket-theme");
  if (savedTheme === "light") {
    html.classList.add("light-theme");
    body.classList.add("light-theme");
  }

  const updateThemeIcon = () => {
    if (!themeBtn) return;
    const isLight = html.classList.contains("light-theme");
    themeBtn.textContent = isLight ? "☀️" : "🌙";
  };
  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      html.classList.toggle("light-theme");
      body.classList.toggle("light-theme");
      const isLight = html.classList.contains("light-theme");
      localStorage.setItem("aimarket-theme", isLight ? "light" : "dark");
      updateThemeIcon();
    });
  }

  // ---- Mobile nav ----
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
    });
  }

  // ---- Active nav link ----
  if (nav) {
    const current = window.location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href === current) {
        a.classList.add("active");
      }
    });
  }

  // ---- WhatsApp FAB tracking ----
  const waBtn = document.getElementById("whatsapp-btn");
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      safeGtag("whatsapp_click", {
        event_category: "contact",
        event_label: "WhatsApp FAB",
      });
    });
  }

  // ---- Home "View Plans & Offers" tracking ----
  const viewPlans = document.getElementById("view-plans");
  if (viewPlans) {
    viewPlans.addEventListener("click", () => {
      safeGtag("view_plans_click", {
        event_category: "engagement",
        event_label: "Home hero",
      });
    });
  }

  // ---- Unlock payment button tracking ----
  const payBasic = document.getElementById("pay-basic");
  if (payBasic) {
    payBasic.addEventListener("click", () => {
      safeGtag("unlock_basic_pay", {
        value: 99,
        currency: "INR",
      });
    });
  }

  const payPro = document.getElementById("pay-pro");
  if (payPro) {
    payPro.addEventListener("click", () => {
      safeGtag("unlock_pro_pay", {
        value: 299,
        currency: "INR",
      });
    });
  }

  const payPremium = document.getElementById("pay-premium");
  if (payPremium) {
    payPremium.addEventListener("click", () => {
      safeGtag("unlock_premium_pay", {
        value: 999,
        currency: "INR",
      });
    });
  }

  // ---- Simple FAQ chatbot ----
  const chatToggle = document.getElementById("chatToggle");
  const chatClose = document.getElementById("chatClose");
  const chatbot = document.getElementById("chatbot");
  const chatAnswer = document.getElementById("chatAnswer");

  if (chatToggle && chatbot) {
    chatToggle.addEventListener("click", () => {
      chatbot.classList.toggle("chatbot-open");
      const isOpen = chatbot.classList.contains("chatbot-open");
      chatbot.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });
  }

  if (chatClose && chatbot) {
    chatClose.addEventListener("click", () => {
      chatbot.classList.remove("chatbot-open");
      chatbot.setAttribute("aria-hidden", "true");
    });
  }

  if (chatbot && chatAnswer) {
    chatbot.querySelectorAll(".chat-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const answer = btn.getAttribute("data-answer") || "";
        chatAnswer.textContent = answer;
        safeGtag("chatbot_question_click", {
          event_category: "engagement",
          event_label: btn.textContent.trim(),
        });
      });
    });
  }
});
