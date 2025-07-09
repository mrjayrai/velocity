import Supply from '../models/SupplySchema.js';
import axios from 'axios';

export const ReOrderAnalyse = async (req, res) => {
    try {
        const result = await Supply.find({}, 'itemName quantityAvailable averageDailyUsage -_id');

        const flaskresponse = await axios.post('http://localhost:5001/api/inventory/reorder/analyze', {data:result}
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json(result); // Send the result as a JSON response
    } catch (err) {
        console.error("Error in ReOrderAnalyse:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


