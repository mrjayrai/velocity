from flask import Blueprint, request, jsonify
# from controllers.attendance_controller import handle_attendance_json

bp = Blueprint('re-order-data', __name__, url_prefix='/api/inventory/reorder')

@bp.route('/analyze', methods=['POST'])
def reorder_days():
    # print("hello")
    data = request.get_json()
    result = reorder_days(data)
    print(result)
    # print(data)
    return jsonify(result)