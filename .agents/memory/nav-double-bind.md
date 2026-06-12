---
name: Nav double-bind root cause
description: Why the mobile menu was broken and how it was fixed.
---

## The bug
Old pages (comparison, news, join) had TWO script blocks:
1. An OLD inline `const mobileMenuBtn = document.getElementById('mobileMenuBtn')` that ran synchronously — before nav.html was injected — so it always got null and crashed.
2. A DUPLICATE `fetch("nav.html")` block that re-loaded the nav and re-ran translate setup.

Additionally, youth.html had a literal `<script>` tag inside a `<script>` block (a copy-paste error), causing `SyntaxError: Unexpected token '<'` which silently broke the entire gallery exit controls script.

## The fix
- All nav loading moved to `page-init.js` (single source of truth)
- `nav.js` has a `dataset.bound === "1"` guard to prevent double-binding if somehow loaded twice
- All old inline nav/mobile-menu JS blocks removed from every page
- The duplicate `<script>` tag in youth.html removed

**Why:** nav.js's `initNav()` runs when `nav.js` is appended to the DOM (after nav.html content is injected), so `#mobileMenuBtn` and `#mobileMenu` always exist by the time it runs.
