// Lebanese Forces Website - Main JavaScript
class LebaneseForcesApp {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = this.getTranslations();
        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.setupScrollAnimations();
        this.setupCounters();
        this.setupP5Background();
        this.setupSmoothScrolling();
        
        // Initialize based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.initPageSpecific(currentPage);
    }

    getTranslations() {
        return {
            en: {
                // Navigation
                heroTitle: "Understanding the Lebanese Forces",
                heroSubtitle: "A comprehensive educational resource exploring the history, ideology, and political role of Lebanon's largest Christian political party",
                
                // Overview Section
                overviewTitle: "The Lebanese Forces: A Political Overview",
                overviewText: "Founded in 1976 during the Lebanese Civil War, the Lebanese Forces has evolved from a Christian militia into Lebanon's largest Christian political party, advocating for sovereignty, democracy, and state monopoly on arms.",
                
                // Cards
                formationTitle: "Formation & History",
                formationText: "Established in 1976 by Bashir Gemayel through the unification of Christian militias during the Lebanese Civil War, initially to counter Palestinian militant organizations.",
                
                ideologyTitle: "Ideology & Platform",
                ideologyText: "Center-right political party advocating for a strong republic based on secularism, rule of law, free markets, and state monopoly on arms. Opposes Hezbollah's military influence.",
                
                currentTitle: "Current Status",
                currentText: "Led by Samir Geagea since 1986, currently holds 19 parliamentary seats as of 2022 elections, forming the largest Christian bloc in Lebanon's parliament.",
                
                // Statistics
                statsTitle: "Key Statistics",
                statsText: "Current political standing and electoral performance of the Lebanese Forces",
                parliamentarySeats: "Parliamentary Seats",
                largestBloc: "(Largest Christian bloc)",
                leadershipYear: "Leadership Since",
                geageaLeadership: "(Samir Geagea)",
                votes2022: "Votes (2022)",
                preferentialVotes: "(Preferential votes)",
                turnout2022: "Turnout %",
                electionTurnout: "(2022 election)",
                
                // Explore Section
                exploreTitle: "Explore Lebanese Politics",
                exploreText: "Dive deeper into Lebanon's political landscape through our comprehensive resources",
                
                timelineCardTitle: "Historical Timeline",
                timelineCardText: "Explore the complete history from formation during the civil war to current political role.",
                timelineCardLink: "View Timeline →",
                
                comparisonCardTitle: "Party Comparison",
                comparisonCardText: "Compare Lebanese Forces with other major political parties across ideology and policies.",
                comparisonCardLink: "Compare Parties →",
                
                newsCardTitle: "News & Resources",
                newsCardText: "Stay updated with current political developments and access educational materials.",
                newsCardLink: "View News →",
                
                // Footer
                footerText: "A comprehensive educational platform for understanding Lebanese politics and the role of the Lebanese Forces",
                footerCopyright: "© 2025 Educational Resource Platform. Created for educational and research purposes."
            },
            ar: {
                // Navigation
                heroTitle: "فهم القوات اللبنانية",
                heroSubtitle: "مورد تعليمي شامل يستكشف التاريخ والأيديولوجيا والدور السياسي لأكبر حزب مسيحي في لبنان",
                
                // Overview Section
                overviewTitle: "القوات اللبنانية: نظرة عامة سياسية",
                overviewText: "تأسست في عام 1976 خلال الحرب الأهلية اللبنانية، تطورت القوات اللبنانية من ميليشيا مسيحية إلى أكبر حزب مسيحي في لبنان، المناصر للسيادة والديمقراطية واحتكار الدولة للسلاح.",
                
                // Cards
                formationTitle: "التكوين والتاريخ",
                formationText: "تأسست في عام 1976 على يد بشير الجميل من خلال توحيد المليشيات المسيحية خلال الحرب الأهلية اللبنانية، في البداية لمواجهة المنظمات الفلسطينية المسلحة.",
                
                ideologyTitle: "الأيديولوجيا والمنصة",
                ideologyText: "حزب سياسي يميني الوسط يناصر لجمهورية قوية قائمة على العلمانية وسيادة القانون والأسواق الحرة واحتكار الدولة للسلاح. يعارض النفوذ العسكري لحزب الله.",
                
                currentTitle: "الوضع الحالي",
                currentText: "يقودها سمير جعجع منذ عام 1986، تحتفظ حالياً بـ 19 مقعداً برلمانياً حتى انتخابات 2022، لتشكل أكبر كتلة مسيحية في البرلمان اللبناني.",
                
                // Statistics
                statsTitle: "إحصائيات رئيسية",
                statsText: "الموقف السياسي الحالي والأداء الانتخابي للقوات اللبنانية",
                parliamentarySeats: "المقاعد البرلمانية",
                largestBloc: "(أكبر كتلة مسيحية)",
                leadershipYear: "القيادة منذ",
                geageaLeadership: "(سمير جعجع)",
                votes2022: "الأصوات (2022)",
                preferentialVotes: "(الأصوات التفضيلية)",
                turnout2022: "نسبة المشاركة %",
                electionTurnout: "(انتخابات 2022)",
                
                // Explore Section
                exploreTitle: "استكشف السياسة اللبنانية",
                exploreText: "تعمق في المشهد السياسي اللبناني من خلال مواردنا الشاملة",
                
                timelineCardTitle: "الجدول الزمني التاريخي",
                timelineCardText: "استكشف التاريخ الكامل من التكوين خلال الحرب الأهلية إلى الدور السياسي الحالي.",
                timelineCardLink: "عرض الجدول الزمني →",
                
                comparisonCardTitle: "مقارنة الأحزاب",
                comparisonCardText: "قارن القوات اللبنانية مع الأحزاب السياسية الرئيسية الأخرى في الأيديولوجيا والسياسات.",
                comparisonCardLink: "قارن الأحزاب →",
                
                newsCardTitle: "الأخبار والموارد",
                newsCardText: "ابقَ على اطلاع بالتطورات السياسية الحالية ووصول إلى المواد التعليمية.",
                newsCardLink: "عرض الأخبار →",
                
                // Footer
                footerText: "منصة تعليمية شاملة لفهم السياسة اللبنانية ودور القوات اللبنانية",
                footerCopyright: "© 2025 منصة الموارد التعليمية. تم الإنشاء لأغراض التعليم والبحث."
            }
        };
    }

    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle');
        const currentLangSpan = document.getElementById('currentLang');
        
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
                this.updateLanguage();
                
                // Update button text
                currentLangSpan.textContent = this.currentLanguage === 'en' ? 'English' : 'العربية';
                
                // Update HTML direction
                document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
                document.documentElement.lang = this.currentLanguage;
            });
        }
    }

    updateLanguage() {
        const translation = this.translations[this.currentLanguage];
        
        // Update all text elements
        Object.keys(translation).forEach(key => {
            const elements = document.querySelectorAll(`[id="${key}"]`);
            elements.forEach(element => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation[key];
                } else {
                    element.textContent = translation[key];
                }
            });
        });

        // Update Arabic text elements
        if (this.currentLanguage === 'ar') {
            document.querySelectorAll('.arabic-text').forEach(element => {
                element.classList.add('arabic-text');
            });
        } else {
            document.querySelectorAll('.arabic-text').forEach(element => {
                element.classList.remove('arabic-text');
            });
        }
    }

    setupScrollAnimations() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // For users who prefer reduced motion, show all elements immediately
            document.querySelectorAll('.reveal').forEach(element => {
                element.classList.add('active');
            });
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal').forEach(element => {
            observer.observe(element);
        });

        // Stagger animation for multiple elements
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index * 0.1, 0.5)}s`;
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    this.animateCounter(entry.target);
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    setupP5Background() {
        // P5.js background animation for hero section - optimized version
        if (typeof p5 !== 'undefined' && document.getElementById('p5-canvas')) {
            new p5((sketch) => {
                let particles = [];
                let animationId;
                
                sketch.setup = () => {
                    const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                    canvas.parent('p5-canvas');
                    
                    // Create fewer particles for better performance
                    for (let i = 0; i < 25; i++) {
                        particles.push({
                            x: sketch.random(sketch.width),
                            y: sketch.random(sketch.height),
                            vx: sketch.random(-0.3, 0.3),
                            vy: sketch.random(-0.3, 0.3),
                            size: sketch.random(1, 3)
                        });
                    }
                };
                
                sketch.draw = () => {
                    sketch.clear();
                    
                    // Update and draw particles - optimized
                    particles.forEach((particle, index) => {
                        particle.x += particle.vx;
                        particle.y += particle.vy;
                        
                        // Wrap around edges
                        if (particle.x < 0) particle.x = sketch.width;
                        if (particle.x > sketch.width) particle.x = 0;
                        if (particle.y < 0) particle.y = sketch.height;
                        if (particle.y > sketch.height) particle.y = 0;
                        
                        // Draw particle
                        sketch.fill(255, 255, 255, 20);
                        sketch.noStroke();
                        sketch.circle(particle.x, particle.y, particle.size);
                    });
                    
                    // Draw connections - optimized
                    particles.forEach((p1, i) => {
                        particles.slice(i + 1).forEach(p2 => {
                            const distance = sketch.dist(p1.x, p1.y, p2.x, p2.y);
                            if (distance < 80) {
                                sketch.stroke(255, 255, 255, 10);
                                sketch.strokeWeight(0.5);
                                sketch.line(p1.x, p1.y, p2.x, p2.y);
                            }
                        });
                    });
                };
                
                sketch.windowResized = () => {
                    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
                };
            });
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initPageSpecific(page) {
        switch (page) {
            case 'timeline.html':
                this.initTimeline();
                break;
            case 'comparison.html':
                this.initComparison();
                break;
            case 'news.html':
                this.initNews();
                break;
            default:
                // Index page specific initialization
                this.initIndex();
        }
    }

    initIndex() {
        // Additional index page specific functionality
        console.log('Index page initialized');
    }

    initTimeline() {
        // Timeline specific functionality
        this.setupTimelineVisualization();
        this.setupTimelineFilters();
    }

    initComparison() {
        // Comparison page specific functionality
        this.setupComparisonCharts();
        this.setupComparisonFilters();
    }

    initNews() {
        // News page specific functionality
        this.setupNewsFilters();
        this.setupBookmarkSystem();
    }

    setupTimelineVisualization() {
        // ECharts timeline implementation
        if (typeof echarts !== 'undefined') {
            const timelineChart = echarts.init(document.getElementById('timeline-chart'));
            
            const timelineData = [
                { name: '1976', value: [1976, 1, 'Formation of Lebanese Forces'], itemStyle: { color: '#1a2332' } },
                { name: '1982', value: [1982, 2, 'Israeli Invasion & Bashir Gemayel Election'], itemStyle: { color: '#c9a96e' } },
                { name: '1986', value: [1986, 3, 'Samir Geagea Takes Leadership'], itemStyle: { color: '#4a6b6b' } },
                { name: '1990', value: [1990, 2, 'End of Civil War & Disarmament'], itemStyle: { color: '#8b4b4b' } },
                { name: '1994', value: [1994, 1, 'Party Banned & Geagea Imprisoned'], itemStyle: { color: '#2c3e50' } },
                { name: '2005', value: [2005, 3, 'Cedar Revolution & Party Revival'], itemStyle: { color: '#1a2332' } },
                { name: '2022', value: [2022, 4, '19 Parliamentary Seats Won'], itemStyle: { color: '#c9a96e' } }
            ];
            
            const option = {
                title: {
                    text: this.currentLanguage === 'en' ? 'Lebanese Forces Timeline' : 'الجدول الزمني للقوات اللبنانية',
                    left: 'center',
                    textStyle: { color: '#1a2332', fontSize: 24, fontWeight: 'bold' }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        return `<strong>${params.value[0]}</strong><br/>${params.value[2]}`;
                    }
                },
                xAxis: {
                    type: 'value',
                    min: 1975,
                    max: 2025,
                    axisLabel: { formatter: '{value}' }
                },
                yAxis: {
                    type: 'value',
                    show: false
                },
                series: [{
                    type: 'scatter',
                    data: timelineData,
                    symbolSize: function(data) {
                        return data[1] * 10;
                    }
                }]
            };
            
            timelineChart.setOption(option);
            
            // Responsive resize
            window.addEventListener('resize', () => {
                timelineChart.resize();
            });
        }
    }

    setupTimelineFilters() {
        const filterButtons = document.querySelectorAll('.timeline-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterTimeline(filter);
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterTimeline(filter) {
        // Implementation for filtering timeline events
        console.log('Filtering timeline by:', filter);
    }

    setupComparisonCharts() {
        // ECharts comparison charts
        if (typeof echarts !== 'undefined') {
            // Electoral performance chart
            const electoralChart = echarts.init(document.getElementById('electoral-chart'));
            
            const electoralData = {
                years: ['2005', '2009', '2018', '2022'],
                lf: [8, 8, 15, 19],
                fpm: [15, 20, 17, 17],
                kataeb: [4, 5, 3, 3]
            };
            
            const option = {
                title: {
                    text: this.currentLanguage === 'en' ? 'Electoral Performance' : 'الأداء الانتخابي',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Lebanese Forces', 'Free Patriotic Movement', 'Kataeb Party'],
                    bottom: 0
                },
                xAxis: {
                    type: 'category',
                    data: electoralData.years
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Lebanese Forces',
                        type: 'line',
                        data: electoralData.lf,
                        itemStyle: { color: '#1a2332' }
                    },
                    {
                        name: 'Free Patriotic Movement',
                        type: 'line',
                        data: electoralData.fpm,
                        itemStyle: { color: '#4a6b6b' }
                    },
                    {
                        name: 'Kataeb Party',
                        type: 'line',
                        data: electoralData.kataeb,
                        itemStyle: { color: '#c9a96e' }
                    }
                ]
            };
            
            electoralChart.setOption(option);
        }
    }

    setupComparisonFilters() {
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterComparison(category);
                
                // Update active state
                categoryFilters.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterComparison(category) {
        // Implementation for filtering comparison data
        console.log('Filtering comparison by:', category);
    }

    setupNewsFilters() {
        const newsFilters = document.querySelectorAll('.news-filter');
        newsFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterNews(category);
                
                // Update active state
                newsFilters.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterNews(category) {
        // Implementation for filtering news
        console.log('Filtering news by:', category);
    }

    setupBookmarkSystem() {
        const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
        bookmarkButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const articleId = e.target.dataset.article;
                this.toggleBookmark(articleId);
                
                // Update visual state
                e.target.classList.toggle('bookmarked');
            });
        });
        
        // Load saved bookmarks
        this.loadBookmarks();
    }

    toggleBookmark(articleId) {
        let bookmarks = JSON.parse(localStorage.getItem('lf-bookmarks') || '[]');
        
        if (bookmarks.includes(articleId)) {
            bookmarks = bookmarks.filter(id => id !== articleId);
        } else {
            bookmarks.push(articleId);
        }
        
        localStorage.setItem('lf-bookmarks', JSON.stringify(bookmarks));
    }

    loadBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('lf-bookmarks') || '[]');
        bookmarks.forEach(articleId => {
            const button = document.querySelector(`[data-article="${articleId}"]`);
            if (button) {
                button.classList.add('bookmarked');
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LebaneseForcesApp();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LebaneseForcesApp;
}