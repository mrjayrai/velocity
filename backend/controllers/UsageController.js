import Supply from '../models/SupplySchema.js';

function getWeekOfMonth(date) {
  const day = date.getDate();
  const start = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // day of week of 1st
  return Math.ceil((day + start) / 7);
}

export const getMonthlyUsageData = async (req, res) => {
  try {
    const supplies = await Supply.find({}, 'usageHistory');

    // Initialize 5 weeks with 0 usage
    const weeklyUsage = Array(5).fill(0);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    supplies.forEach(supply => {
      supply.usageHistory.forEach(entry => {
        if (entry.date && typeof entry.usedQuantity === 'number') {
          const date = new Date(entry.date);
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            const week = getWeekOfMonth(date); // 1 to 5
            weeklyUsage[week - 1] += entry.usedQuantity;
          }
        }
      });
    });

    res.status(200).json({ monthlyUsage: weeklyUsage });
  } catch (err) {
    console.error("Error fetching monthly usage:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
