import mongoose from 'mongoose';

const usageSchema = new mongoose.Schema({
    date: Date,
    usedQuantity: Number
});

const supplySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: String,
    quantityAvailable: { type: Number, default: 0 },
    averageDailyUsage: Number,
    lastUpdated: { type: Date, default: Date.now },
    reorderThreshold: Number,
    reorderSuggestion: { type: Boolean, default: false },
    unit: String,
    location: String,
    notes: String,
    usageHistory: [usageSchema]
});

export default mongoose.model('Supply', supplySchema);