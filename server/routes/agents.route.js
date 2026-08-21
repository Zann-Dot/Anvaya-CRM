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
        const { search, status } = req.query;
        const page = parseInt(req.query.page, 5) || 1;
        const limit = parseInt(req.query.limit, 5) || 5;
        const searchTerm = search ? search.trim() : ""
        let query = {}
        if (search) {
            const searchTermRegex = { $regex: searchTerm, $options: "i" };
            query.$or = [
                { name: searchTermRegex },
                { email: searchTermRegex }
            ]
        }

        if (status) query.status = status.trim().toUpperCase();

        const [totalAgents, agents] = await Promise.all([
            SalesAgent.countDocuments(query),
            SalesAgent.find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
        ])

        if (!Array.isArray(agents) || !agents)
            return res.status(404).json({ error: "Agents not found" });

        res.json({
            agents,
            totalAgents,
            totalPages: Math.ceil(totalAgents / limit),
            currentPage: page,
        });
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
