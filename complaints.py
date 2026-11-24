import os
import uuid
from datetime import datetime

from flask import Blueprint, jsonify, request

from models import Complaint, db

complaints_bp = Blueprint('complaints', __name__)


@complaints_bp.route('/api/complaints', methods=['POST'])
def create_complaint():
    data = request.form or {}
    image_file = request.files.get('image')
    image_url = None

    if image_file and image_file.filename:
        from werkzeug.utils import secure_filename

        filename = secure_filename(image_file.filename)
        upload_dir = os.path.join('static', 'uploads')
        os.makedirs(upload_dir, exist_ok=True)
        filepath = os.path.join(upload_dir, filename)
        image_file.save(filepath)
        image_url = f'/static/uploads/{filename}'

    complaint_number = f"C-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"

    new_complaint = Complaint(
        complaint_number=complaint_number,
        user_id=1,
        category=data.get('category', 'General'),
        description=data.get('description', ''),
        latitude=data.get('latitude'),
        longitude=data.get('longitude'),
        address=data.get('address'),
        status=data.get('status', 'SUBMITTED'),
        priority=data.get('priority', 'Medium'),
        image_url=image_url,
    )

    db.session.add(new_complaint)
    db.session.commit()

    return jsonify({
        'message': 'Complaint submitted successfully',
        'complaint': new_complaint.to_dict(),
    }), 201


@complaints_bp.route('/api/complaints', methods=['GET'])
def get_complaints():
    complaints = Complaint.query.order_by(Complaint.created_at.desc()).all()
    return jsonify([c.to_dict() for c in complaints]), 200


@complaints_bp.route('/api/complaints/<int:complaint_id>/status', methods=['PATCH'])
@complaints_bp.route('/api/admin/complaints/<int:complaint_id>/status', methods=['PATCH'])
def update_complaint_status(complaint_id):
    complaint = Complaint.query.get_or_404(complaint_id)
    payload = request.get_json(silent=True) or {}

    if 'status' in payload:
        complaint.status = payload['status']
    if 'priority' in payload:
        complaint.priority = payload['priority']

    db.session.commit()
    return jsonify(complaint.to_dict()), 200
