import Supply from '../models/SupplySchema.js';

export const Insight = async (req, res) => {
    try {
        const supplies = await Supply.find();

        const totalItems = supplies.length;

        const itemsToReorder = supplies.filter(
            (supply) =>
                supply.reorderThreshold !== undefined &&
                supply.quantityAvailable <= supply.reorderThreshold
        ).length;

        res.status(200).json({
            totalItems,
            itemsToReorder
        });
    } catch (err) {
        console.error("Error in FetchInsights:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
