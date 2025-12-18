from flask import jsonify, request, send_from_directory
from app import app, db
from models import SiteConfig, NewsArticle, TimelineEvent
import os

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    if filename.endswith('.html') or filename.endswith('.js') or filename.endswith('.css') or filename.endswith('.png') or filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.gif') or filename.endswith('.svg') or filename.endswith('.ico'):
        if os.path.exists(filename):
            return send_from_directory('.', filename)
        if os.path.exists(os.path.join('resources', filename)):
            return send_from_directory('resources', filename)
    return send_from_directory('.', filename)

@app.route('/api/config', methods=['GET'])
def get_config():
    config = {}
    for item in SiteConfig.query.all():
        config[item.key] = item.value
    return jsonify(config)

@app.route('/api/news', methods=['GET'])
def get_news():
    news = NewsArticle.query.filter_by(is_published=True).order_by(NewsArticle.date.desc()).all()
    return jsonify([{
        'id': n.id,
        'title': n.title,
        'content': n.content,
        'category': n.category,
        'date': n.date.isoformat() if n.date else None,
        'read_time': n.read_time
    } for n in news])

@app.route('/api/timeline', methods=['GET'])
def get_timeline():
    events = TimelineEvent.query.order_by(TimelineEvent.order).all()
    return jsonify([{
        'id': e.id,
        'year': e.year,
        'title': e.title,
        'description': e.description,
        'order': e.order
    } for e in events])


def init_default_config():
    defaults = {
        'primary_color': '#DC143C',
        'secondary_color': '#228B22',
        'accent_color': '#FFD700',
        'font_heading': 'Inter',
        'font_body': 'Inter',
        'site_title': 'Lebanese Forces Youth',
        'site_subtitle': 'Educational Platform',
        'hero_title': 'Lebanese Forces Youth',
        'hero_subtitle': 'Educational platform for Lebanon\'s largest Christian political party youth movement'
    }
    for key, value in defaults.items():
        if not SiteConfig.query.filter_by(key=key).first():
            config = SiteConfig(key=key, value=value, category='general')
            db.session.add(config)
    db.session.commit()

with app.app_context():
    init_default_config()
