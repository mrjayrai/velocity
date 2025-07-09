from flask import Blueprint, request, jsonify
from controllers.attendance_controller import handle_attendance_json

bp = Blueprint('', __name__, url_prefix='/api/quantity')

@bp.route('/analyze', methods=['POST'])
def reorder_quantity():
    data = request.get_json()
    consultants = data.get("consultants", [])
    result = handle_attendance_json(consultants)
    return jsonify(result)
