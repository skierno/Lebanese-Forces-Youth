class SiteConfigLoader {
    constructor() {
        this.config = {};
        this.isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';
        this.init();
    }

    async init() {
        await this.loadConfig();
        this.applyConfig();
        if (this.isPreviewMode) {
            this.showPreviewBanner();
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('/api/config');
            if (response.ok) {
                this.config = await response.json();
            }
        } catch (error) {
            console.log('Using default config');
        }
    }

    applyConfig() {
        this.applyColors();
        this.applyFonts();
        this.applyContent();
        this.applyCustomEdits();
    }

    applyColors() {
        const root = document.documentElement;
        if (this.config.primary_color) {
            root.style.setProperty('--primary-color', this.config.primary_color);
            document.querySelectorAll('.text-red-600, .text-cedar-red').forEach(el => {
                el.style.color = this.config.primary_color;
            });
            document.querySelectorAll('.bg-red-600, .bg-cedar-red').forEach(el => {
                el.style.backgroundColor = this.config.primary_color;
            });
            document.querySelectorAll('.hover\\:bg-red-700').forEach(el => {
                el.addEventListener('mouseenter', () => el.style.backgroundColor = this.darkenColor(this.config.primary_color, 20));
                el.addEventListener('mouseleave', () => el.style.backgroundColor = this.config.primary_color);
            });
        }
        if (this.config.secondary_color) {
            root.style.setProperty('--secondary-color', this.config.secondary_color);
            document.querySelectorAll('.bg-green-600, .bg-cedar-green').forEach(el => {
                el.style.backgroundColor = this.config.secondary_color;
            });
        }
        if (this.config.accent_color) {
            root.style.setProperty('--accent-color', this.config.accent_color);
            document.querySelectorAll('.text-yellow-300, .text-phoenix-gold').forEach(el => {
                el.style.color = this.config.accent_color;
            });
        }

        const heroSection = document.querySelector('.hero-bg');
        if (heroSection && this.config.primary_color && this.config.secondary_color) {
            heroSection.style.background = `linear-gradient(135deg, ${this.config.primary_color}, ${this.config.secondary_color})`;
        }
    }

    applyFonts() {
        if (this.config.font_heading) {
            document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
                el.style.fontFamily = `'${this.config.font_heading}', sans-serif`;
            });
        }
        if (this.config.font_body) {
            document.body.style.fontFamily = `'${this.config.font_body}', sans-serif`;
        }
    }

    applyContent() {
        if (this.config.site_title) {
            const titleEl = document.getElementById('siteTitle');
            if (titleEl) titleEl.textContent = this.config.site_title;
        }
        if (this.config.site_subtitle) {
            const subtitleEl = document.getElementById('siteSubtitle');
            if (subtitleEl) subtitleEl.textContent = this.config.site_subtitle;
        }
        if (this.config.hero_title) {
            const mainTitle = document.getElementById('mainTitle');
            if (mainTitle) mainTitle.innerHTML = this.config.hero_title;
        }
        if (this.config.hero_subtitle) {
            const mainDesc = document.getElementById('mainDescription');
            if (mainDesc) mainDesc.textContent = this.config.hero_subtitle;
        }
    }

    applyCustomEdits() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const customEditsKey = 'custom_edits_' + currentPage;
        
        this.assignEditIds(currentPage);
        
        if (this.config[customEditsKey]) {
            try {
                const edits = JSON.parse(this.config[customEditsKey]);
                edits.forEach(edit => {
                    let element = null;
                    
                    if (edit.editId) {
                        element = document.querySelector('[data-edit-id="' + edit.editId + '"]') ||
                                  document.getElementById(edit.editId);
                    } else if (edit.selector) {
                        if (edit.selector.startsWith('#')) {
                            element = document.querySelector(edit.selector);
                        } else if (edit.selector.includes(' ')) {
                            element = document.querySelector('.' + edit.selector.split(' ')[0]);
                        } else {
                            element = document.getElementById(edit.selector) || 
                                      document.querySelector('.' + edit.selector) ||
                                      document.querySelector(edit.selector);
                        }
                    }
                    
                    if (element) {
                        if (edit.content) {
                            element.innerHTML = edit.content;
                        }
                        if (edit.style) {
                            element.setAttribute('style', edit.style);
                        }
                    }
                });
            } catch (e) {
                console.log('Could not apply custom edits:', e);
            }
        }
    }

    assignEditIds(currentPage) {
        const pageName = currentPage.replace('.html', '');
        const editableElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, li');
        let editIndex = 0;
        
        editableElements.forEach(el => {
            if (!el.hasAttribute('data-edit-id')) {
                const stableId = el.id || 'edit-' + pageName + '-' + editIndex;
                el.setAttribute('data-edit-id', stableId);
                editIndex++;
            }
        });
    }

    showPreviewBanner() {
        const banner = document.createElement('div');
        banner.id = 'preview-banner';
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, #f59e0b, #d97706);
            color: white;
            padding: 12px 20px;
            text-align: center;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        banner.innerHTML = `
            <span>Preview Mode - Changes are not live yet</span>
            <button onclick="window.close()" style="margin-left: 20px; background: white; color: #d97706; border: none; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-weight: 600;">Close Preview</button>
        `;
        document.body.prepend(banner);
        document.body.style.paddingTop = '120px';
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max((num >> 16) - amt, 0);
        const G = Math.max((num >> 8 & 0x00FF) - amt, 0);
        const B = Math.max((num & 0x0000FF) - amt, 0);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SiteConfigLoader();
});
