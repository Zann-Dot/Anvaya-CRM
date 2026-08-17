import express from "express";
import { SalesAgent } from "../models/salesAgent.model.js";
const agentRouter = express.Router();

agentRouter.post("/agents", async (req, res) => {
    try {
        const { agentId, name, email } = req.body;
        if (!name || !email)
            return res.status(400).json({ error: "Invalid name or email inputs" });

        const agent = await SalesAgent.findByIdAndUpdate(
            agentId,
            { email, name },
            { new: true },
        );
        if (agent)
            return res.status(200).json({
                success: true,
                message: "Agent updated successfully",
            });

        await SalesAgent.create({ name, email });
        res.status(201).json({
            success: true,
            message: "Agent added successfully.",
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
});

agentRouter.delete("/agents/:id", async (req, res) => {
    try {
        const deletedAgent = await SalesAgent.findByIdAndDelete(req.params.id);
        if (!deletedAgent)
            return res.status(404).json({ error: "Agent not found" });
        res.json({
            success: true,
            message: "Agent deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default agentRouter;
