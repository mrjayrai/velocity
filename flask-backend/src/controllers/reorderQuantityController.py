import os
from flask import Blueprint, request, jsonify
from joblib import load
 
# Create Blueprint
bp = Blueprint('re-order-data', __name__, url_prefix='/api/inventory/reorder')
 
# Load the model from the correct relative path
model = None
try:
    model_path = os.path.join(os.path.dirname(__file__), '..', 'reorder_model.joblib')
    model = load(model_path)
    print("✅ Model loaded successfully.")
except Exception as e:
    print(f"❌ Failed to load model: {e}")
 
# Helper function to calculate days left
def calculate_order_interval(data_list):
    results = []
 
    for item in data_list:
        item_name = item.get("itemName")
        quantity = item.get("quantityAvailable")
        daily_usage = item.get("averageDailyUsage")
 
        # Validate data types and required fields
        if (
            item_name is None
            or quantity is None
            or daily_usage is None
            or not isinstance(quantity, (int, float))
            or not isinstance(daily_usage, (int, float))
            or daily_usage == 0
        ):
            continue  # skip invalid items
 
        # Predict days left using the model
        try:
            prediction = model.predict([[quantity, daily_usage]])[0]
            predicted_days = round(prediction, 2)
        except Exception as e:
            predicted_days = None
            print(f"⚠️ Prediction error for {item_name}: {e}")
 
        results.append({
            "itemName": item_name,
            "quantityAvailable": quantity,
            "averageDailyUsage": daily_usage,
            "predictedDaysLeft": predicted_days
        })
 
    return results
 
# Route to handle reorder prediction
@bp.route('/analyze', methods=['POST'])
def reorder_days():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
 
    try:
        data = request.get_json()
 
        # Ensure input is a list or convert single object to list
        if isinstance(data, dict):
            data = [data]
        elif not isinstance(data, list):
            return jsonify({"error": "Expected a list or object in JSON body"}), 400
 
        result = calculate_order_interval(data)
        return jsonify(result), 200
 
    except Exception as e:
        print(f"❌ Unexpected server error: {e}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500