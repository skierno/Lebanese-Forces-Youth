# Lebanese Forces Youth - Educational Platform

## Overview

This is a bilingual (English/Arabic) educational web platform for the Lebanese Forces Youth political movement. The application serves as a comprehensive resource covering the history, ideology, and political role of Lebanon's largest Christian political party. Key features include an interactive historical timeline, political party comparison tools, news aggregation, and membership enrollment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML Pages**: Multiple standalone HTML pages (index.html, timeline.html, comparison.html, news.html, join.html) served directly by Flask from the root directory
- **Styling**: Tailwind CSS via CDN with custom Lebanese-themed color palette (cedar-red #DC143C, cedar-green #228B22, phoenix-gold #FFD700, mediterranean-blue #1a2332)
- **JavaScript**: Vanilla JavaScript (main.js) handles language switching between English and Arabic, scroll animations, and dynamic content
- **Visualization Libraries**: ECharts.js for data charts, Anime.js for animations, Splide.js for carousels
- **Dynamic Configuration**: config-loader.js fetches settings from /api/config endpoint and dynamically applies colors, fonts, and content across all pages
- **Preview System**: All pages support `?preview=true` query parameter for admin preview functionality

### Backend Architecture
- **Framework**: Flask (Python) with modular file structure
- **Entry Point**: main.py imports app and routes, runs development server on port 5000
- **Application Factory**: app.py initializes Flask app with session secret, database connection, and ProxyFix middleware for proxy header handling
- **Routing**: routes.py handles static file serving from both root directory and /resources folder, plus API endpoints for configuration and content
- **Templates**: Jinja2 templates in /templates folder for admin panel, login, and error pages

### Database Design
- **ORM**: SQLAlchemy with Flask-SQLAlchemy extension using DeclarativeBase pattern
- **Database**: PostgreSQL connected via DATABASE_URL environment variable
- **Connection Pooling**: Configured with pool_pre_ping=True and 300-second recycle time for connection health management
- **Models**:
  - `SiteConfig`: Key-value configuration storage with category grouping for appearance and content settings
  - `NewsArticle`: News content with title, content, category, date, read_time, and publication status
  - `TimelineEvent`: Historical events with year, title, description, and ordering for timeline display

### Authentication & Authorization
- **Simple Auth System**: Environment variable-based admin authentication (ADMIN_USERNAME, ADMIN_PASSWORD)
- **Session Management**: Flask sessions with permanent session support for maintaining login state
- **Protected Routes**: `@require_login` and `@require_admin` decorators in simple_auth.py for route protection
- **Login Flow**: Template-based login form at /login with redirect support via session-stored next_url

### Content Management
- **Admin Panel**: Full-featured admin interface at /admin route with tabbed sections for:
  - Appearance (colors, fonts, styling)
  - Site Content (text and translations)
  - Visual Editor (live preview editing)
  - News Articles (CRUD operations)
  - Timeline Events (historical content management)
- **API Endpoints**: RESTful GET /api/config returns site configuration as JSON for frontend consumption

## External Dependencies

### Frontend Libraries (CDN)
- Tailwind CSS - Utility-first CSS framework
- ECharts.js - Interactive charting library for data visualization
- Anime.js - Lightweight animation library
- Splide.js - Carousel/slider component
- Google Fonts - Inter and Playfair Display typefaces

### Backend Dependencies
- Flask - Python web framework
- Flask-SQLAlchemy - Database ORM integration
- SQLAlchemy - Python SQL toolkit and ORM
- Werkzeug - WSGI utility library (ProxyFix middleware)

### Database
- PostgreSQL - Primary database via DATABASE_URL environment variable

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Flask session encryption key
- `ADMIN_USERNAME` - Admin panel username
- `ADMIN_PASSWORD` - Admin panel password