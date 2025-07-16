import os
from joblib import load

# Load model
model = None
try:
    model_path = os.path.join(os.path.dirname(__file__), '..', 'reorder_model.joblib')
    model = load(model_path)
    print("✅ Model loaded successfully.")
except Exception as e:
    print(f"❌ Failed to load model: {e}")

# Calculate reorder days
def calculate_order_interval(data_list):
    results = []

    for item in data_list:
        item_name = item.get("itemName")
        quantity = item.get("quantityAvailable")
        daily_usage = item.get("averageDailyUsage")

        if item_name is None or quantity is None or daily_usage is None:
            continue

        try:
            quantity = float(quantity)
            daily_usage = float(daily_usage)
        except ValueError:
            continue

        if daily_usage == 0:
            predicted_days = None
        else:
            predicted_days = round(quantity / daily_usage, 2)

        results.append({
            "itemName": item_name,
            "quantityAvailable": quantity,
            "averageDailyUsage": daily_usage,
            "predictedDaysLeft": predicted_days
        })

    return results

