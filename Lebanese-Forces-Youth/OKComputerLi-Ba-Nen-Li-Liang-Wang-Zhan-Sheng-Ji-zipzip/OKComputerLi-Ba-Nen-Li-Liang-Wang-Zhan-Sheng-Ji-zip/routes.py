from flask import session, render_template, jsonify, request, send_from_directory, redirect, url_for
from app import app, db
from simple_auth import require_login, require_admin, verify_credentials, is_logged_in
from models import SiteConfig, NewsArticle, TimelineEvent
import os

@app.before_request
def make_session_permanent():
    session.permanent = True

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        
        if verify_credentials(username, password):
            session['admin_logged_in'] = True
            session['admin_username'] = username
            next_url = session.pop('next_url', None)
            if next_url:
                return redirect(next_url)
            return redirect(url_for('admin_panel'))
        else:
            return render_template('login.html', error='Invalid username or password')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('admin_logged_in', None)
    session.pop('admin_username', None)
    return redirect(url_for('index'))

@app.route('/<path:filename>')
def serve_static(filename):
    if filename.endswith('.html') or filename.endswith('.js') or filename.endswith('.css') or filename.endswith('.png') or filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.gif') or filename.endswith('.svg') or filename.endswith('.ico'):
        if os.path.exists(filename):
            return send_from_directory('.', filename)
        if os.path.exists(os.path.join('resources', filename)):
            return send_from_directory('resources', filename)
    return send_from_directory('.', filename)

@app.route('/admin')
@require_admin
def admin_panel():
    config = {}
    for item in SiteConfig.query.all():
        config[item.key] = item.value
    news = NewsArticle.query.order_by(NewsArticle.date.desc()).all()
    timeline = TimelineEvent.query.order_by(TimelineEvent.order).all()
    admin_user = {'username': session.get('admin_username', 'Admin')}
    return render_template('admin.html', 
                         user=admin_user, 
                         config=config, 
                         news=news, 
                         timeline=timeline,
                         users=[])

@app.route('/api/config', methods=['GET'])
def get_config():
    config = {}
    for item in SiteConfig.query.all():
        config[item.key] = item.value
    return jsonify(config)

@app.route('/api/config', methods=['POST'])
@require_admin
def update_config():
    data = request.get_json()
    for key, value in data.items():
        config = SiteConfig.query.filter_by(key=key).first()
        if config:
            config.value = value
        else:
            config = SiteConfig(key=key, value=value)
            db.session.add(config)
    db.session.commit()
    return jsonify({"success": True})

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

@app.route('/api/news/admin/<int:id>', methods=['GET'])
@require_admin
def get_news_admin(id):
    article = NewsArticle.query.get_or_404(id)
    return jsonify({
        'id': article.id,
        'title': article.title,
        'content': article.content,
        'category': article.category,
        'date': article.date.isoformat() if article.date else None,
        'read_time': article.read_time,
        'is_published': article.is_published
    })

@app.route('/api/news', methods=['POST'])
@require_admin
def create_news():
    data = request.get_json()
    article = NewsArticle(
        title=data['title'],
        content=data['content'],
        category=data.get('category', 'political'),
        read_time=data.get('read_time', '3 min read')
    )
    db.session.add(article)
    db.session.commit()
    return jsonify({"success": True, "id": article.id})

@app.route('/api/news/<int:id>', methods=['PUT'])
@require_admin
def update_news(id):
    article = NewsArticle.query.get_or_404(id)
    data = request.get_json()
    article.title = data.get('title', article.title)
    article.content = data.get('content', article.content)
    article.category = data.get('category', article.category)
    article.read_time = data.get('read_time', article.read_time)
    article.is_published = data.get('is_published', article.is_published)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/news/<int:id>', methods=['DELETE'])
@require_admin
def delete_news(id):
    article = NewsArticle.query.get_or_404(id)
    db.session.delete(article)
    db.session.commit()
    return jsonify({"success": True})

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

@app.route('/api/timeline/<int:id>', methods=['GET'])
@require_admin
def get_timeline_event(id):
    event = TimelineEvent.query.get_or_404(id)
    return jsonify({
        'id': event.id,
        'year': event.year,
        'title': event.title,
        'description': event.description,
        'order': event.order
    })

@app.route('/api/timeline', methods=['POST'])
@require_admin
def create_timeline_event():
    data = request.get_json()
    event = TimelineEvent(
        year=data['year'],
        title=data['title'],
        description=data['description'],
        order=data.get('order', 0)
    )
    db.session.add(event)
    db.session.commit()
    return jsonify({"success": True, "id": event.id})

@app.route('/api/timeline/<int:id>', methods=['PUT'])
@require_admin
def update_timeline_event(id):
    event = TimelineEvent.query.get_or_404(id)
    data = request.get_json()
    event.year = data.get('year', event.year)
    event.title = data.get('title', event.title)
    event.description = data.get('description', event.description)
    event.order = data.get('order', event.order)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/api/timeline/<int:id>', methods=['DELETE'])
@require_admin
def delete_timeline_event(id):
    event = TimelineEvent.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({"success": True})

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
