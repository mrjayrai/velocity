from flask import Blueprint, request, jsonify

bp = Blueprint('restock_bp', __name__, url_prefix='/api/quantity')

@bp.route('/analyze', methods=['POST'])
def reorder_quantity():
    data = request.get_json()
    return jsonify(data)