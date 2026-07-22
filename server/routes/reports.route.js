import express from "express";
import { Leads } from "../models/leads.model.js";
const reportRouter = express.Router();

reportRouter.get("/report/last-week", async (req, res) => {
    try {
        const lastSeventhDay = new Date();
        lastSeventhDay.setDate(lastSeventhDay.getDate() - 7);

        const closedLeadsInLastSevenDays = await Leads.find({
            status: { $eq: "Closed" },
            closedAt: { $gte: lastSeventhDay },
        });

        if (!closedLeadsInLastSevenDays || closedLeadsInLastSevenDays.length === 0)
            return res.status(404).json({ error: "No leads found" });

        res.json(closedLeadsInLastSevenDays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

reportRouter.get("/report/pipeline", async (req, res) => {
    try {
        const totalLeadsInPipeline = await Leads.find().countDocuments({
            status: { $ne: "Closed" },
        });

        if (!totalLeadsInPipeline)
            return res.status(404).json({ error: "No leads found" });

        res.json({ totalLeadsInPipeline });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default reportRouter;
