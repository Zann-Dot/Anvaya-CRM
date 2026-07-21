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

leadsRouter.get("/leads", async (req, res) => {
    try {
        const { salesAgent, status, tags, source } = req.query;
        const query = {};
        if (salesAgent) {
            query.salesAgent = salesAgent
        }

        if (status) {
            query.status = status
        }

        if (tags) {
            query.tags = { $in: tags }
        }

        if (source) {
            query.source = source
        }

        const leads = await Leads.find(query);

        if (!Array.isArray(leads) || !leads)
            return res.status(409).json({ error: "cannot find leads" });

        res.json(leads);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

leadsRouter.put("/leads/:id", async (req, res) => {
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

        const updatedLead = await Leads.findByIdAndUpdate(
            req.params.id,
            {
                name,
                source,
                salesAgent,
                status,
                tags,
                timeToClose,
                priority
            },
            { new: true }
        );

        if (!updatedLead)
            return res.status(404).json({
                error: `Lead with ID '${req.params.id}' not found.`
            });

        res.json({
            success: true,
            message: "Lead updated successfully",
            updatedLead
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

leadsRouter.delete("/leads/:id", async (req, res) => {
    try {
        const deletedLead = await Leads.findByIdAndDelete(req.params.id);

        if (!deletedLead)
            return res.status(404), json({ error: `Lead with ID '${req.params.id}' not found.` });

        res.json({
            success: true,
            message: "Lead deleted successfully."
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
export default leadsRouter;
