(function () {
  function initNav() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!mobileMenuBtn || !mobileMenu) {
      console.warn("[nav.js] Missing #mobileMenuBtn or #mobileMenu");
      return;
    }

    // Prevent double-binding if nav is injected more than once
    if (mobileMenuBtn.dataset.bound === "1") return;
    mobileMenuBtn.dataset.bound = "1";

    // Toggle menu
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
      }
    });

    // Keep clicks inside menu from closing it
    mobileMenu.addEventListener("click", (e) => e.stopPropagation());

    console.log("[nav.js] Mobile menu bound ✅");
  }

  // Run immediately if DOM is already ready (common with injected nav)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }
})();