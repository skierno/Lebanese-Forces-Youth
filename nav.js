document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove("active");
      }
    });
  }

  // Active page highlight (works for desktop + mobile)
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    }
  });

  // Language toggle (safe)
  const langToggle = document.getElementById("langToggle");
  const currentLang = document.getElementById("currentLang");

  if (langToggle && currentLang) {
    langToggle.addEventListener("click", () => {
      const isEnglish = currentLang.textContent.trim() === "English";

      currentLang.textContent = isEnglish ? "العربية" : "English";
      document.documentElement.dir = isEnglish ? "rtl" : "ltr";
      document.documentElement.lang = isEnglish ? "ar" : "en";

      if (typeof applyTranslations === "function") {
        applyTranslations(isEnglish ? "ar" : "en");
      }
    });
  }
});
