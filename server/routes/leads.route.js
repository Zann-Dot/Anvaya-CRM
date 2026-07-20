import express from "express";
import { SalesAgent } from "../models/salesAgent.model.js";
import { Leads } from "../models/leads.model.js";
const leadsRouter = express.Router();

leadsRouter.post("/leads", async (req, res) => {
    try {
        const { name, source, salesAgent, status, tags, timeToClose, priority } =
            req.body;

        if (
            !name ||
            !source ||
            !salesAgent ||
            !status ||
            !tags ||
            !timeToClose ||
            !priority
        )
            return res
                .status(400)
                .json({ error: "Invalid input: all fields are required." });

        const agent = await SalesAgent.findById(salesAgent);
        if (!agent)
            return res.status(404).json({
                error: `Sales agent with ID '${salesAgent}' not found.`,
            });

        const lead = await Leads.create({
            name,
            source,
            salesAgent: agent,
            status,
            tags,
            timeToClose,
            priority,
        });

        res.json({
            success: true,
            message: "Lead added successfully",
            lead
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default leadsRouter;
