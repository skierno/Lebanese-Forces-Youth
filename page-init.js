/**
 * page-init.js  —  loaded by every page via <script src="page-init.js"></script>
 * ─────────────────────────────────────────────────────────────────────────────
 *  Handles:
 *    1. Announcement banner (dismissible, remembers via localStorage)
 *    2. Injecting the shared nav  → edit nav.html / nav.js
 *    3. Injecting the shared footer → edit footer.html
 *    4. Google Translate + language-toggle button
 *    5. Detecting the Google Translate bar so the nav stays visible
 * ─────────────────────────────────────────────────────────────────────────────
 */
(function () {

  /* ═══════════════════════════════════════════════════════════════════════
     ✏️ ANNOUNCEMENT BANNER — edit the text/link below, then bump the KEY
        so it reappears for users who already dismissed the old one.
     ═══════════════════════════════════════════════════════════════════════ */
  const BANNER_KEY     = "announcement-v1";           // bump to "v2" to re-show after editing
  const BANNER_HEIGHT  = 40;                          // px — keep this slim
  const BANNER_HTML    = `
    📅 <strong>27th Annual Convention</strong> &nbsp;·&nbsp; Dallas, TX &nbsp;·&nbsp; Nov 5–8, 2026 &nbsp;
    <a href="https://lfna.info" target="_blank" rel="noopener"
       style="color:#ffd700;font-weight:600;text-decoration:underline;text-underline-offset:2px;">
      Register at Lfna.info →
    </a>
  `;

  function injectBanner() {
    if (localStorage.getItem(BANNER_KEY)) return;       // already dismissed

    const bar = document.createElement("div");
    bar.id = "site-banner";
    bar.style.cssText = [
      "position:fixed", "top:0", "left:0", "right:0", "z-index:9999",
      `height:${BANNER_HEIGHT}px`,
      "background:linear-gradient(90deg,#991b1b,#b91c1c)",
      "color:#fff", "font-size:13px", "font-weight:500",
      "display:flex", "align-items:center", "justify-content:center",
      "gap:8px", "padding:0 48px 0 16px",
      "box-shadow:0 1px 4px rgba(0,0,0,.25)"
    ].join(";");

    bar.innerHTML = `
      <span style="text-align:center;line-height:1.3">${BANNER_HTML}</span>
      <button id="bannerClose" aria-label="Close announcement"
        style="position:absolute;right:12px;top:50%;transform:translateY(-50%);
               background:transparent;border:none;color:rgba(255,255,255,.7);
               font-size:18px;line-height:1;cursor:pointer;padding:4px 6px;
               border-radius:4px;transition:color .15s"
        onmouseover="this.style.color='#fff'"
        onmouseout="this.style.color='rgba(255,255,255,.7)'">
        ✕
      </button>
    `;

    document.body.insertBefore(bar, document.body.firstChild);

    // Push body down to account for banner + nav
    document.body.style.paddingTop = (BANNER_HEIGHT + 64) + "px";
    window.__bannerVisible = true;

    document.getElementById("bannerClose").addEventListener("click", () => {
      localStorage.setItem(BANNER_KEY, "1");
      bar.remove();
      document.body.style.paddingTop = "64px";
      const nav = document.querySelector("nav");
      if (nav) nav.style.top = "0";
      window.__bannerVisible = false;
    });
  }

  injectBanner();

  /* ── 1. NAV ──────────────────────────────────────────────────────────── */
  fetch("nav.html")
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById("nav-placeholder");
      if (placeholder) placeholder.innerHTML = html;

      // Shift nav down if banner is showing
      if (window.__bannerVisible) {
        const nav = document.querySelector("nav");
        if (nav) nav.style.top = BANNER_HEIGHT + "px";
      }

      // Load nav.js (mobile menu + active-link highlighting)
      const navScript = document.createElement("script");
      navScript.src = "nav.js";
      document.body.appendChild(navScript);

      /* ── 3. GOOGLE TRANSLATE ─────────────────────────────────────────── */
      window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,ar", autoDisplay: false },
          "google_translate_element"
        );
      };
      const gt = document.createElement("script");
      gt.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(gt);

      function setLanguage(lang) {
        const select = document.querySelector("select.goog-te-combo");
        if (!select) return false;
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        localStorage.setItem("siteLang", lang);
        const el = document.getElementById("currentLang");
        if (el) el.textContent = lang === "ar" ? "العربية" : "English";
        return true;
      }

      function waitForGoogleSelectAndBind() {
        let tries = 0;
        const timer = setInterval(() => {
          tries++;
          const select = document.querySelector("select.goog-te-combo");
          if (select) {
            clearInterval(timer);
            const saved = localStorage.getItem("siteLang");
            if (saved) setLanguage(saved);
            const btn = document.getElementById("langToggle");
            if (btn) {
              btn.addEventListener("click", () => {
                const next = localStorage.getItem("siteLang") === "ar" ? "en" : "ar";
                setLanguage(next);
              });
            }
          }
          if (tries > 60) clearInterval(timer);
        }, 100);
      }

      waitForGoogleSelectAndBind();
    });

  /* ── 2. FOOTER ───────────────────────────────────────────────────────── */
  fetch("footer.html")
    .then(r => r.text())
    .then(html => {
      const placeholder = document.getElementById("footer-placeholder");
      if (placeholder) placeholder.innerHTML = html;
    });

  /* ── 4. GOOGLE TRANSLATE BAR DETECTION ──────────────────────────────── */
  (function detectGoogleBar() {
    const check = setInterval(() => {
      if (document.querySelector(".goog-te-banner-frame")) {
        document.body.classList.add("has-google-bar");
        clearInterval(check);
      }
    }, 100);
  })();

})();
