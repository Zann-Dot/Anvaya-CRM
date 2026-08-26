import express from "express";
import { Leads } from "../models/leads.model.js";
import { SalesAgent } from "../models/salesAgent.model.js";
import { startOfMonth, subMonths } from "date-fns";
import dateFilter from "../utilis/dateFilterMiddleware.js";
const reportRouter = express.Router();
reportRouter.use(dateFilter);

reportRouter.get("/report/pipeline", async (req, res) => {
    try {
        const [totalLeadsInPipeline, totalLeadsClosed] = await Promise.all([
            Leads.countDocuments({
                ...req.dateFilter,
                status: { $ne: "Closed" },
            }),
            Leads.countDocuments({
                ...req.dateFilter,
                status: { $eq: "Closed" },
            }),
        ]);

        if (!totalLeadsInPipeline && !totalLeadsClosed)
            return res.status(404).json({ error: "No leads found" });

        res.json({ totalLeadsInPipeline, totalLeadsClosed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

reportRouter.get("/report/leads-closed-by-agents", async (req, res) => {
    try {
        const report = await SalesAgent.aggregate([
            {
                $lookup: {
                    from: "leads",
                    localField: "_id",
                    foreignField: "salesAgent",
                    as: "assignedLeads",
                },
            },
            {
                $match: {
                    $expr: {
                        $gt: [{ $size: "$assignedLeads" }, 0],
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    leadsClosed: {
                        $size: {
                            $filter: {
                                input: "$assignedLeads",
                                as: "lead",
                                cond: { $eq: ["$$lead.status", "Closed"] },
                            },
                        },
                    },
                },
            },
        ]);
        if (!report && !Array.isArray(report))
            return res.status(404).json({ error: "Something went wrong" });

        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const safePercentageChange = (current, previous) => {
    if (!previous || previous === 0) return current > 0 ? 100 : 0;
    return Number((((current - previous) / previous) * 100).toFixed(2));
};

const safeRate = (numerator, denominator) => {
    if (!denominator || denominator === 0) return 0;
    return Number(((numerator / denominator) * 100).toFixed(2));
};

reportRouter.post("/report/last-month-comparison", async (req, res) => {
    try {
        const presentDate = new Date();
        const startOfTheMonth = startOfMonth(presentDate);

        const sameDayPrevMonth = subMonths(presentDate, 1);
        const startOfPrevMonth = startOfMonth(subMonths(presentDate, 1));

        const [
            totalLeadsInPrevMonth,
            totalLeadsCLosedInPrevMonth,
            activeLeadsInPrevMonth,
            totalLeadsOfTheMonth,
            totalLeadsClosedThisMonth,
            activeLeads,
        ] = await Promise.all([
            Leads.countDocuments({
                createdAt: { $gte: startOfPrevMonth, $lte: sameDayPrevMonth },
            }),
            Leads.countDocuments({
                status: { $eq: "Closed" },
                createdAt: { $gte: startOfPrevMonth, $lte: sameDayPrevMonth },
            }),
            Leads.countDocuments({
                status: { $ne: "Closed" },
                createdAt: { $gte: startOfPrevMonth, $lte: sameDayPrevMonth },
            }),
            Leads.countDocuments({
                createdAt: { $gte: startOfTheMonth, $lte: presentDate },
            }),
            Leads.countDocuments({
                status: { $eq: "Closed" },
                createdAt: { $gte: startOfTheMonth, $lte: presentDate },
            }),
            Leads.countDocuments({
                status: { $ne: "Closed" },
                createdAt: { $gte: startOfTheMonth, $lte: presentDate },
            }),
        ]);

        const changeInLeads = safePercentageChange(
            totalLeadsOfTheMonth,
            totalLeadsInPrevMonth,
        );

        const changeInClosedLeads = safePercentageChange(
            totalLeadsClosedThisMonth,
            totalLeadsCLosedInPrevMonth,
        );

        const changeInActiveLeads = safePercentageChange(
            activeLeads,
            activeLeadsInPrevMonth,
        );

        const conversionRateInPrevMon = safeRate(
            totalLeadsCLosedInPrevMonth,
            totalLeadsInPrevMonth,
        );

        const conversionRateThisMonth = safeRate(
            totalLeadsClosedThisMonth,
            totalLeadsOfTheMonth,
        );

        const changeInConversionRate =
            conversionRateThisMonth - conversionRateInPrevMon;

        res.json({
            totalLeadsClosedThisMonth,
            totalLeadsOfTheMonth,
            activeLeads,
            changeInLeads,
            changeInClosedLeads,
            changeInActiveLeads,
            conversionRateThisMonth,
            changeInConversionRate,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default reportRouter;
