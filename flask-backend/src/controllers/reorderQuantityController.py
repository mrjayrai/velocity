import math

def calculate_order_interval(product_name, quantity_available, average_daily_usage):
    """
    Calculate the interval (in days) at which an order should be placed for a given product.

    Args:
        product_name (str): Name of the product.
        quantity_available (int): Number of items available.
        average_daily_usage (int): Average daily usage of the product.

    Returns:
        dict: A dictionary containing the product name, quantity available, average daily usage,
              and the order interval in days.
    """
    try:
        # Validate inputs
        if not isinstance(product_name, str) or not isinstance(quantity_available, int) or not isinstance(average_daily_usage, int):
            return {
                "error": "Invalid input types. Ensure product_name is a string, quantity_available and average_daily_usage are integers.",
                "status": "failure"
            }

        if quantity_available <= 0 or average_daily_usage <= 0:
            return {
                "error": "Quantity available and average daily usage must be greater than zero.",
                "status": "failure"
            }

        # Calculate the order interval
        order_interval = math.ceil(quantity_available / average_daily_usage)

        return {
            "status": "success",
            "product_name": product_name,
            "quantity_available": quantity_available,
            "average_daily_usage": average_daily_usage,
            "order_interval_days": order_interval
        }

    except Exception as e:
        return {
            "status": "failure",
            "error": str(e)
        }

# Example usage
result = calculate_order_interval("USB Cable", 286, 18)
print(result)
