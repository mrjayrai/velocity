import Supply from '../models/SupplySchema.js';

const Insight = async(req,res)=>{
    try{
        
    }catch(err){
        console.error("Error in FetchInsights:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}