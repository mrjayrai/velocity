from flask import Blueprint, request, jsonify
# from controllers.attendance_controller import handle_attendance_json

bp = Blueprint('re-order-data', __name__, url_prefix='/api/inventory/reorder')

@bp.route('/analyze', methods=['POST'])
def reorder_days():
    # print("hello")
    data = request.get_json()
    # consultants = data.get("consultants", [])
    # result = handle_attendance_json(consultants)
    # print(data)
    return jsonify(data)