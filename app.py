import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from config import Config
from models import db, Complaint

migrate = Migrate()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    with app.app_context():
        db.create_all()
        if not Complaint.query.first():
            seed_data = [
                Complaint(
                    complaint_number='C-20261014-1A2B3C',
                    user_id=1,
                    category='Roads & Traffic',
                    description='Large pothole causing traffic issues near the market square.',
                    latitude='13.0827',
                    longitude='80.2707',
                    address='Market Square, Chennai',
                    status='SUBMITTED',
                    priority='Critical',
                ),
                Complaint(
                    complaint_number='C-20261014-4D5E6F',
                    user_id=1,
                    category='Water Supply',
                    description='Water is leaking from a public valve and flooding the street.',
                    latitude='13.0674',
                    longitude='80.2376',
                    address='Anna Nagar, Chennai',
                    status='UNDER REVIEW',
                    priority='High',
                ),
                Complaint(
                    complaint_number='C-20261014-7G8H9I',
                    user_id=1,
                    category='Waste Management',
                    description='Garbage collection has been delayed in the residential area.',
                    latitude='13.0524',
                    longitude='80.2498',
                    address='T. Nagar, Chennai',
                    status='RESOLVED',
                    priority='Medium',
                ),
            ]
            db.session.add_all(seed_data)
            db.session.commit()

    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "service": "CivicSync AI API"}), 200

    from routes.complaints import complaints_bp
    app.register_blueprint(complaints_bp)

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Resource not found"}), 404

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
