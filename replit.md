# Lebanese Forces Youth - Educational Platform

## Overview

This is a bilingual (English/Arabic) educational web platform for the Lebanese Forces Youth political movement. The application serves as a comprehensive resource covering the history, ideology, and political activities of Lebanon's largest Christian political party. Key features include an interactive historical timeline, political party comparison tools, news aggregation, and membership registration capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML Pages**: Multiple standalone HTML pages (index.html, timeline.html, comparison.html, news.html, join.html) served directly by Flask
- **Styling**: Tailwind CSS via CDN with custom color configuration for Lebanese-themed design (cedar-red, cedar-green, phoenix-gold, mediterranean-blue)
- **JavaScript**: Vanilla JavaScript with client-side interactivity (main.js) handling language switching, animations, and dynamic content
- **Visualization Libraries**: ECharts.js for data visualization, Anime.js for animations, Splide.js for carousels

### Backend Architecture
- **Framework**: Flask (Python) with modular structure
- **Entry Point**: main.py imports app and routes, runs development server on port 5000
- **Application Factory**: app.py initializes Flask app, database, and middleware
- **Routing**: routes.py handles static file serving and API endpoints
- **Authentication**: Custom Replit OAuth integration (replit_auth.py) with Flask-Dance and Flask-Login

### Database Design
- **ORM**: SQLAlchemy with Flask-SQLAlchemy extension
- **Database**: PostgreSQL (via DATABASE_URL environment variable)
- **Connection Pooling**: Pre-ping enabled with 300-second recycle time
- **Models**:
  - `User`: Authentication with OAuth support, admin flag
  - `OAuth`: OAuth tokens linked to users and browser sessions
  - `SiteConfig`: Key-value configuration storage by category
  - `NewsArticle`: News content with categories, dates, publication status
  - `TimelineEvent`: Historical events for timeline feature

### Authentication & Authorization
- **OAuth Provider**: Replit authentication via Flask-Dance
- **Session Management**: Flask sessions with permanent session support
- **Admin System**: Role-based access with `is_admin` flag on User model
- **Protected Routes**: `@require_login` and `@require_admin` decorators

### Content Management
- **Admin Panel**: Template-based admin interface at /admin route (templates/admin.html)
- **API Endpoints**: RESTful endpoints for configuration and content management
- **Static Content**: HTML pages with embedded content, database-backed dynamic content
- **Config Loader**: All frontend pages load configuration from /api/config and apply colors, fonts, and content dynamically (config-loader.js)

### Visual Editor & Preview System
- **Preview Mode**: All pages support `?preview=true` parameter to show preview banner for admins
- **Visual Editor**: Wix/GoDaddy-style inline editing within admin panel via iframe
- **Live Config Updates**: Changes made in admin panel are immediately reflected on frontend pages
- **Responsive Preview**: Desktop, tablet, and mobile preview modes in visual editor

## External Dependencies

### Third-Party Services
- **Replit OAuth**: Primary authentication provider for user login
- **PostgreSQL Database**: Production database via DATABASE_URL environment variable

### Frontend CDN Libraries
- Tailwind CSS (styling framework)
- ECharts.js (data visualization charts)
- Anime.js (animation library)
- Splide.js (carousel/slider component)
- Google Fonts (Inter, Playfair Display, Amiri for Arabic)

### Python Packages
- Flask (web framework)
- Flask-SQLAlchemy (database ORM)
- Flask-Login (user session management)
- Flask-Dance (OAuth integration)
- Werkzeug (WSGI utilities, proxy fix middleware)
- PyJWT (JSON Web Token handling)

### Environment Variables Required
- `SESSION_SECRET`: Flask session encryption key
- `DATABASE_URL`: PostgreSQL connection string