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

  // ===== ACTIVE PAGE HIGHLIGHT (100% RELIABLE) =====
  const page = document.body?.dataset?.page;

  if (page) {
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.nav === page) {
        link.classList.add("active");
      }
    });
  }

// ===== LANGUAGE TOGGLE (WORKS ON EVERY PAGE) =====
  
