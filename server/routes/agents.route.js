import express from "express";
import { SalesAgent } from "../models/salesAgent.model.js";
const agentRouter = express.Router();

agentRouter.post("/agents", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email)
            return res.status(400).json({ error: "Invalid name or email inputs" });

        const agent = await SalesAgent.findOne({ email });
        if (agent)
            return res
                .status(409)
                .json({
                    error: "Sales agent with email 'john@example.com' already exists.",
                });

        await SalesAgent.create({ name, email });
        res.json({
            success: true,
            message: "Agent added to database successfully.",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

agentRouter.get("/agents", async (req, res) => {
    try {
        const agents = await SalesAgent.find({});

        if (!Array.isArray(agents) || !agents)
            return res.status(404).json({ error: "Agents not found" });

        res.json(agents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default agentRouter;
