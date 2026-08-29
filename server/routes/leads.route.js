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
        const { search, salesAgent, status, tags, source, priority, timeToClose } =
            req.query;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const query = {};
        let sort = { createdAt: -1 };

        if (search) {
            const searchTerm = search ? search.trim() : "";
            const searchTermRegex = { $regex: searchTerm, $options: "i" };
            query.$or = [
                { name: searchTermRegex },
                { company: searchTermRegex },
                { email: searchTermRegex },
            ];
        }

        if (salesAgent) query.salesAgent = salesAgent;
        if (status) query.status = status;
        if (tags) query.tags = { $in: tags };
        if (source) query.source = source;
        if (priority) sort = { priorityWeight: priority };
        if (timeToClose) {
            sort = { timeToClose };
            query.status = { $ne: "Closed" };
        };


        const [totalLeads, leads] = await Promise.all([
            Leads.countDocuments(query),
            Leads.find(query)
                .sort(sort)
                .populate("salesAgent")
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
        ]);

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
            priority
        } = req.body;
        const closedAt = status === "Closed" ? new Date() : null;

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
            return res.status(404).json({ error: "No leads deleted" });

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
