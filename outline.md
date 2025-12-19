# Lebanese Forces Website - Project Outline

## File Structure

```
/mnt/okcomputer/output/
├── index.html              # Main landing page with hero section
├── timeline.html           # Historical timeline page
├── comparison.html         # Political party comparison page  
├── news.html              # News and educational resources page
├── main.js                # Main JavaScript functionality
├── resources/             # Images and media assets
│   ├── hero-parliament.png
│   ├── timeline-hero.png
│   ├── comparison-hero.png
│   ├── news-hero.png
│   └── [additional images from search]
└── [design documentation files]
```

## Page Breakdown

### 1. index.html - Main Landing Page
**Purpose**: Introduction to Lebanese Forces and navigation hub
**Sections**:
- Navigation bar with language toggle (English/Arabic)
- Hero section with Lebanese Parliament building image
- Overview of Lebanese Forces (formation, ideology, current status)
- Quick access cards to other sections (Timeline, Comparison, News)
- Key facts and statistics about LF
- Footer with copyright information

**Interactive Elements**:
- Language switcher with smooth transitions
- Animated statistics counters
- Hover effects on navigation cards
- Scroll reveal animations

### 2. timeline.html - Historical Timeline
**Purpose**: Comprehensive historical timeline of Lebanese Forces
**Sections**:
- Navigation bar
- Timeline hero section
- Dual timeline interface (War Timeline 1975-1990, Political Timeline 1990-2025)
- Interactive timeline with clickable events
- Detailed event information cards
- Filter options (show all, war events, political events)
- Search functionality

**Interactive Elements**:
- Interactive timeline visualization using ECharts.js
- Expandable event detail cards
- Timeline filtering and search
- Smooth scrolling between time periods
- Hover effects on timeline points

### 3. comparison.html - Political Party Comparison
**Purpose**: Compare Lebanese Forces with other major Lebanese political parties
**Sections**:
- Navigation bar
- Comparison hero section
- Party comparison matrix
- Electoral performance charts
- Policy position comparisons
- Interactive filtering by category
- Detailed party profiles

**Interactive Elements**:
- Dynamic comparison table with filtering
- Electoral performance charts using ECharts.js
- Policy position radar charts
- Interactive hover states
- Toggle between different comparison views

### 4. news.html - News & Educational Resources
**Purpose**: Current news and educational materials about Lebanese politics
**Sections**:
- Navigation bar
- News hero section
- News dashboard with categories
- Educational resources library
- Key documents and speeches
- Debate preparation materials
- Bookmark system

**Interactive Elements**:
- News filtering and search
- Educational resource categorization
- Bookmark functionality using localStorage
- Document download simulation
- Quiz system for knowledge testing

## Technical Implementation

### Core Libraries Used
- **ECharts.js**: Timeline visualization and comparison charts
- **Anime.js**: Smooth transitions and animations
- **Splide.js**: Image carousels and content sliders
- **p5.js**: Background visual effects
- **Matter.js**: Interactive physics-based animations

### JavaScript Architecture
- **main.js**: Core functionality and initialization
- **Language System**: Dynamic content switching between English/Arabic
- **Data Management**: JSON-based content structure for easy updates
- **Local Storage**: User preferences and bookmarks
- **Responsive Design**: Mobile-first approach with desktop enhancements

### Content Structure
- **English Content**: Complete English translations of all materials
- **Arabic Content**: Full Arabic translations with proper RTL support
- **Historical Data**: Comprehensive timeline events and political information
- **Educational Materials**: Structured content for learning and debate preparation

## Design System

### Color Palette
- Primary: Deep Navy (#1a2332)
- Secondary: Warm Gold (#c9a96e)
- Accent: Muted Teal (#4a6b6b)
- Background: Off-white (#fafafa)
- Text: Charcoal (#2c3e50)

### Typography
- English: Playfair Display (headlines), Inter (body)
- Arabic: Traditional Arabic fonts with modern readability

### Visual Effects
- Subtle scroll animations with reveal effects
- Hover states with elevation and color transitions
- Smooth page transitions and content loading
- Interactive timeline and chart animations

## User Experience Flow

### Primary Navigation
1. **Home** → Overview and quick access
2. **Timeline** → Historical exploration
3. **Comparison** → Political analysis
4. **News** → Current events and education

### Key Features
- **Bilingual Support**: Seamless English/Arabic switching
- **Educational Focus**: Structured learning and debate preparation
- **Interactive Exploration**: Dynamic timeline and comparison tools
- **Current Affairs**: News updates and political developments
- **Accessibility**: Full keyboard navigation and screen reader support

This structure creates a comprehensive educational platform that serves both as a reference resource and a practical tool for understanding Lebanese politics, preparing for debates, and staying informed about current events.