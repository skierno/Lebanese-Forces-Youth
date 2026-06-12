(function () {
  function initNav() {

    /* ── Mobile Menu ──────────────────────────────────────────────────── */
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu    = document.getElementById("mobileMenu");

    if (!mobileMenuBtn || !mobileMenu) {
      console.warn("[nav.js] Missing #mobileMenuBtn or #mobileMenu");
      return;
    }

    // Prevent double-binding if nav.js is somehow loaded twice
    if (mobileMenuBtn.dataset.bound === "1") return;
    mobileMenuBtn.dataset.bound = "1";

    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
      }
    });

    // Clicks inside the menu don't close it
    mobileMenu.addEventListener("click", (e) => e.stopPropagation());

    /* ── Active Page Highlighting ─────────────────────────────────────── */
    // Marks the current page's nav link with the "active" class
    const page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href");
      if (href && (href === page || (page === "" && href === "index.html"))) {
        link.classList.add("active");
      }
    });

    console.log("[nav.js] Nav initialized ✅");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }
})();
