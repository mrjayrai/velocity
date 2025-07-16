import Supply from '../models/SupplySchema.js';
import axios from 'axios';

export const ReStockAnalyse = async (req, res) => {
  try {
    // Fetch only necessary fields
    const result = await Supply.find({}, 'itemName quantityAvailable averageDailyUsage -_id');

    // POST to Flask API
    const flaskresponse = await axios.post(
      'https://velocity-89e4.onrender.com/api/quantity/analyze',
      { data: result },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // ✅ Send only the usable data back to frontend
    res.status(200).json(flaskresponse.data);
  } catch (err) {
    console.error("Error in ReOrderAnalyse:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

