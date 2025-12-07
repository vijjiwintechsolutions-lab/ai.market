// script.js

(function () {
  const html = document.documentElement;
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  // ---------------- THEME SETUP ----------------
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

  // ---------------- MOBILE NAV ----------------
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
    });
  }

  // ---------------- ACTIVE NAV LINK ----------------
  if (nav) {
    const current = window.location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === current) {
        a.classList.add("active");
      }
    });
  }

  // ---------------- CHATBOT ----------------
  const chatbotWidget = document.getElementById("chatbotWidget");
  const chatbotFAB = document.getElementById("chatbotFAB");
  const chatbotClose = document.getElementById("chatbotClose");
  const messagesEl = document.getElementById("chatbotMessages");
  const inputEl = document.getElementById("chatbotInput");
  const sendBtn = document.getElementById("chatbotSend");

  if (chatbotWidget && chatbotFAB && chatbotClose && messagesEl && inputEl && sendBtn) {
    // Simple Q&A knowledge base
    const faqMap = [
      {
        keywords: ["basic", "plan"],
        answer:
          "The Basic plan (₹99) is for personal / light usage. For more limits, check Pro or Premium on the Pricing page."
      },
      {
        keywords: ["pro", "plan"],
        answer:
          "The Pro plan (₹299) is ideal for regular creators and freelancers. It includes more tools and higher limits."
      },
      {
        keywords: ["premium", "plan"],
        answer:
          "Premium (₹999) is best for agencies, studios and resellers, with maximum limits and all tools unlocked."
      },
      {
        keywords: ["payment", "razorpay", "fail", "failed", "refund"],
        answer:
          "If a payment failed or you need refund help, please note your Razorpay reference ID and contact us on WhatsApp: +91 9676142165."
      },
      {
        keywords: ["contact", "help", "support"],
        answer:
          "You can contact us anytime via the Contact page or WhatsApp +91 9676142165. We usually reply as soon as possible."
      }
    ];

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addMessage(text, type) {
      const div = document.createElement("div");
      div.className = type === "user" ? "user-msg" : "bot-msg";
      div.textContent = text;
      messagesEl.appendChild(div);
      scrollToBottom();
    }

    function findAnswer(q) {
      const question = q.toLowerCase();
      for (const item of faqMap) {
        if (item.keywords.some((k) => question.includes(k))) {
          return item.answer;
        }
      }
      // default answer
      return "Thanks for your question! For detailed help, please share your requirement or payment details on WhatsApp: +91 9676142165.";
    }

    function handleSend() {
      const text = inputEl.value.trim();
      if (!text) return;
      addMessage(text, "user");
      inputEl.value = "";

      const answer = findAnswer(text);
      setTimeout(() => {
        addMessage(answer, "bot");
      }, 400);
    }

    // Toggle widget open/close
    chatbotFAB.addEventListener("click", () => {
      const isVisible = chatbotWidget.style.display === "flex";
      chatbotWidget.style.display = isVisible ? "none" : "flex";
      if (!isVisible) {
        scrollToBottom();
      }
      // optional GA event
      if (typeof gtag === "function") {
        gtag("event", "chatbot_toggle", {
          event_category: "engagement",
          event_label: isVisible ? "close" : "open"
        });
      }
    });

    chatbotClose.addEventListener("click", () => {
      chatbotWidget.style.display = "none";
    });

    sendBtn.addEventListener("click", handleSend);

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    });
  }
})();
