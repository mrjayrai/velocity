def calculate_reorder_quantity(average_daily_usage, lead_time_days, buffer_percent):
    """
    Calculates optimal reorder quantity:
    reorder_quantity = (avg_daily_use × lead_time) + buffer_stock
    buffer_stock = buffer_percent% of (avg_daily_use × lead_time)
    """
    demand_during_lead = average_daily_usage * lead_time_days
    buffer_stock = demand_during_lead * (buffer_percent / 100)
    reorder_quantity = demand_during_lead + buffer_stock
    return round(reorder_quantity)


if __name__ == "__main__":
    print("\n📦 Reorder Quantity Optimizer")

    try:
        avg_daily_use = float(input("Enter average daily usage (units/day): "))
        lead_time = int(input("Enter lead time (in days): "))
        buffer_percent = float(input("Enter buffer stock % (e.g., 20 for 20%): "))

        reorder_qty = calculate_reorder_quantity(avg_daily_use, lead_time, buffer_percent)
        print(f"\n✅ Recommended Reorder Quantity: {reorder_qty} units")

    except ValueError:
        print("❌ Invalid input. Please enter numeric values only.")