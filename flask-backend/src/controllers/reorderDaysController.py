def analyze_reorder(payload):
    items = payload.get("data")
    if not items or not isinstance(items, list):
        return {"error": "Invalid input. 'data' must be a list of items."}, 400

    reorder_trigger_days = 7
    ideal_stock_days = 30
    result = []

    for item in items:
        item_name = item.get("itemName")
        quantity_available = item.get("quantityAvailable")
        average_daily_usage = item.get("averageDailyUsage")

        if item_name is None or quantity_available is None or average_daily_usage is None:
            continue  # skip incomplete items

        try:
            quantity_available = float(quantity_available)
            average_daily_usage = float(average_daily_usage)
        except ValueError:
            continue

        if average_daily_usage <= 0:
            continue

        days_left = round(quantity_available / average_daily_usage, 2)
        reorder_quantity = round(average_daily_usage * ideal_stock_days)

        result.append({
            "itemName": item_name,
            "reorderNeeded": days_left <= reorder_trigger_days,
            "recommendedReorderQuantity": reorder_quantity
        })

    return result, 200
