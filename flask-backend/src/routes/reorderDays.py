from flask import Blueprint, request, jsonify
from controllers.reorderQuantityController import calculate_order_interval
 
bp = Blueprint('reorder_bp', __name__, url_prefix='/api/inventory/reorder')
 
@bp.route('/analyze', methods=['POST'])
def analyze_reorder():
    try:
        data = request.get_json()
 
        # ✅ Fix: Extract list from "data" key if present
        if isinstance(data, dict) and "data" in data:
            data = data["data"]
 
        if not isinstance(data, list):
            return jsonify({"error": "Expected a list or object in JSON body"}), 400
 
        result = calculate_order_interval(data)
        # print(result)
        return jsonify(result), 200
 
    except Exception as e:
        print(f"❌ Unexpected server error: {e}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500