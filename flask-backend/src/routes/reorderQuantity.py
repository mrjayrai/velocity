from flask import Blueprint, request, jsonify
from controllers.reorderDaysController import analyze_reorder

bp = Blueprint('restock_bp', __name__, url_prefix='/api/quantity')

@bp.route('/analyze', methods=['POST'])
def reorder_quantity():
    try:
        data = request.get_json()
        print("🧾 Received data:", data)
        result, status = analyze_reorder(data)
        return jsonify(result), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500
