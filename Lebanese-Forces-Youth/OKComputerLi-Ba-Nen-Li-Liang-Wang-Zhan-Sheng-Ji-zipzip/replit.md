# Lebanese Forces Youth - Educational Platform

## Overview

This is a bilingual (English/Arabic) educational web platform for the Lebanese Forces Youth political movement. The application serves as a comprehensive resource covering the history, ideology, and political role of Lebanon's largest Christian political party. The platform includes an interactive historical timeline, political party comparison tools, news aggregation, and membership registration functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML Pages**: Multiple standalone HTML pages (index.html, timeline.html, comparison.html, news.html, join.html) served directly by Flask
- **Styling**: Tailwind CSS via CDN with custom color configuration for Lebanese-themed design (cedar-red #DC143C, cedar-green #228B22, phoenix-gold #FFD700, mediterranean-blue #1a2332)
- **JavaScript**: Vanilla JavaScript with client-side interactivity (main.js) handling language switching, animations, and dynamic content
- **Visualization Libraries**: ECharts.js for data visualization, Anime.js for animations, Splide.js for carousels
- **Dynamic Configuration**: config-loader.js fetches settings from /api/config and applies colors, fonts, and content dynamically to all pages

### Backend Architecture
- **Framework**: Flask (Python) with modular structure
- **Entry Point**: main.py imports app and routes, runs development server on port 5000
- **Application Factory**: app.py initializes Flask app, database, and middleware (ProxyFix for proxy headers)
- **Routing**: routes.py handles static file serving from root directory and /resources folder, plus API endpoints
- **Authentication**: Custom Replit OAuth integration (replit_auth.py) using Flask-Dance and Flask-Login with decorator-based access control

### Database Design
- **ORM**: SQLAlchemy with Flask-SQLAlchemy extension using DeclarativeBase
- **Database**: PostgreSQL (via DATABASE_URL environment variable)
- **Connection Pooling**: Pre-ping enabled with 300-second recycle time for connection health
- **Models**:
  - `User`: Authentication with Replit OAuth support, admin flag, profile info
  - `OAuth`: OAuth tokens linked to users and browser sessions with unique constraint
  - `SiteConfig`: Key-value configuration storage organized by category
  - `NewsArticle`: News content with title, category, date, publication status
  - `TimelineEvent`: Historical events for timeline feature with ordering

### Authentication & Authorization
- **OAuth Provider**: Replit authentication via Flask-Dance OAuth2ConsumerBlueprint
- **Session Management**: Flask sessions with permanent session support and browser session keys
- **Admin System**: Role-based access with `is_admin` flag on User model
- **Protected Routes**: `@require_login` and `@require_admin` decorators for route protection
- **User Storage**: Custom UserSessionStorage class for OAuth token management

### Content Management
- **Admin Panel**: Template-based admin interface at /admin route with tabbed sections for appearance, content, news, timeline, and users
- **API Endpoints**: RESTful endpoints including GET /api/config for site configuration
- **Preview System**: All pages support `?preview=true` parameter for admin preview functionality

## External Dependencies

### Python Packages
- **Flask**: Web framework
- **Flask-SQLAlchemy**: Database ORM integration
- **Flask-Dance**: OAuth authentication
- **Flask-Login**: User session management
- **PyJWT**: JWT token handling for authentication
- **Werkzeug**: WSGI utilities and ProxyFix middleware

### Frontend CDN Libraries
- **Tailwind CSS**: Utility-first CSS framework
- **ECharts.js**: Interactive charting library for data visualization
- **Anime.js**: JavaScript animation library
- **Splide.js**: Carousel/slider component
- **Google Fonts**: Inter and Playfair Display typefaces

### External Services
- **PostgreSQL Database**: Primary data storage (DATABASE_URL environment variable)
- **Replit OAuth**: Authentication provider for user login
- **Session Secret**: SESSION_SECRET environment variable for Flask sessions