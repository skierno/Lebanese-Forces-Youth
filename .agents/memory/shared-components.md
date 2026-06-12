---
name: Shared nav/footer/translate pattern
description: Every page loads nav, footer, and Google Translate through page-init.js — the single source of truth.
---

## Rule
Every HTML page must load shared components like this (at the bottom of body):

```html
<div id="nav-placeholder"></div>   <!-- in <body>, before content -->
...content...
<div id="footer-placeholder"></div>
<script src="page-init.js"></script>
<script src="config-loader.js"></script>
```

- **nav** → edit `nav.html` and `nav.js`
- **footer** → edit `footer.html`
- **translate / language toggle** → edit `page-init.js`
- **site-wide CSS** → edit `site.css` (cards, buttons, section headings, etc.)

**Why:** Previously every page had 50+ lines of duplicated nav-fetch + translate code, plus an old `mobileMenuBtn` block that ran BEFORE nav was injected, causing null-reference crashes on comparison/news/join.

**How to apply:** When adding a new page, copy the 4-line pattern above. Never inline nav loading.

## Shared CSS classes (in site.css)
- `.card` — white card with border, shadow, lift-on-hover
- `.btn-primary` — red filled button
- `.btn-outline` — white outline button (for use on red heroes)
- `.btn-outline-red` — red outline button (for use on white backgrounds)
- `.section-heading` — red, bold, 30px section title
- `.section-subheading` — gray subtitle, centered, max-width
- `.icon-circle` — 48px circle avatar for icons
- `.section-divider` — thin gray hr
- `.footer-social-btn` — dark border social button for footer

## Logo
Use `resources/logoLF-modified.png` (NOT `resources/logo.png` — that was the old one).
