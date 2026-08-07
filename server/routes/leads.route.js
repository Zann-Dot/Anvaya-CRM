import express from "express";
import { SalesAgent } from "../models/salesAgent.model.js";
import { Leads } from "../models/leads.model.js";
import { Types } from "mongoose";
const leadsRouter = express.Router();

leadsRouter.post("/leads", async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            avatar,
            source,
            salesAgent,
            status,
            tags,
            timeToClose,
            priority,
        } = req.body;

        if (
            !name ||
            !company ||
            !email ||
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
            email,
            company,
            avatar,
            source,
            salesAgent,
            status,
            tags,
            timeToClose,
            priority,
        });

        res.json({
            success: true,
            message: "Lead added successfully",
            lead,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

leadsRouter.get("/leads", async (req, res) => {
    try {
        const { salesAgent, status, tags, source } = req.query;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const query = {};

        if (salesAgent) {
            query.salesAgent = salesAgent;
        }

        if (status) {
            query.status = status;
        }

        if (tags) {
            query.tags = { $in: tags };
        }

        if (source) {
            query.source = source;
        }

        const totalLeads = await Leads.countDocuments();
        const leads = await Leads.find(query)
            .sort({ _id: -1 })
            .populate("salesAgent")
            .skip((page - 1) * limit)
            .limit(limit);

        if (!Array.isArray(leads) || !leads)
            return res.status(409).json({ error: "cannot find leads" });

        res.json({
            leads,
            totalLeads,
            totalPages: Math.ceil(totalLeads / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

leadsRouter.get("/leads/details/:id", async (req, res) => {
    try {
        const lead = await Leads.findById(req.params.id).populate("salesAgent");
        if (!lead) return res.status(404).json({ error: "Lead not found" });
        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

leadsRouter.put("/leads/:id", async (req, res) => {
    try {
        const {
            name,
            company,
            email,
            avatar,
            source,
            salesAgent,
            status,
            tags,
            timeToClose,
            priority,
            closedAt = null,
        } = req.body;

        if (
            !name ||
            !company ||
            !email ||
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
                company,
                email,
                avatar,
                source,
                salesAgent,
                status,
                tags,
                timeToClose,
                priority,
                closedAt,
            },
            { new: true },
        );

        if (!updatedLead)
            return res.status(404).json({
                error: `Lead with ID '${req.params.id}' not found.`,
            });

        res.json({
            success: true,
            message: "Lead updated successfully",
            updatedLead,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

leadsRouter.delete("/leads", async (req, res) => {
    try {
        const { leadIds } = req.body;

        if (!Array.isArray(leadIds) || leadIds.length === 0)
            return res.status(400).json({ error: "Provide atleast 1 lead ID" });

        const objectIds = leadIds.map((id) => new Types.ObjectId(id));
        const deletedLeads = await Leads.deleteMany({ _id: { $in: objectIds } });

        if (deletedLeads.deletedCount === 0)
            return res.status(404).json({ error: "No leads deleted" })

        res.json({
            success: true,
            message: `${deletedLeads.deletedCount} ${deletedLeads.deletedCount === 1 ? "lead" : "leads"} deleted successfully.`,
            deletedLeads,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default leadsRouter;
