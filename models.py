from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Complaint(db.Model):
    __tablename__ = 'complaints'

    id = db.Column(db.Integer, primary_key=True)
    complaint_number = db.Column(db.String(64), unique=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False, default=1)
    category = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.String(50), nullable=True)
    longitude = db.Column(db.String(50), nullable=True)
    address = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(50), default='SUBMITTED')
    priority = db.Column(db.String(50), default='Medium')
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'complaint_number': self.complaint_number,
            'user_id': self.user_id,
            'category': self.category,
            'description': self.description,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'address': self.address,
            'status': self.status,
            'priority': self.priority,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
