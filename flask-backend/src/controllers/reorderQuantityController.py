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
    model_inputs = []
    valid_items = []
 
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
            continue
 
        model_inputs.append([quantity, daily_usage])
        valid_items.append({
            "itemName": item_name,
            "quantityAvailable": quantity,
            "averageDailyUsage": daily_usage
        })
 
    predicted_days = []
    if model is not None and model_inputs:
        try:
            predicted_days = model.predict(model_inputs)
            predicted_days = predicted_days.tolist()  # ✅ ensure it's a list
            # print("✅ Prediction:", predicted_days)
        except Exception as e:
            print(f"⚠️ Model prediction error: {e}")
            predicted_days = [None] * len(valid_items)
    else:
        predicted_days = [None] * len(valid_items)
 
    for i, item in enumerate(valid_items):
        item["predictedDaysLeft"] = round(predicted_days[i], 2) 
        # print(item)
        results.append(item)
 

    # print(results)
    return results