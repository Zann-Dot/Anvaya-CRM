import express from "express";
import { Leads } from "../models/leads.model.js";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
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
        const totalLeadsInPipeline = await Leads.countDocuments({
            status: { $ne: "Closed" },
        });

        if (!totalLeadsInPipeline)
            return res.status(404).json({ error: "No leads found" });

        res.json({ totalLeadsInPipeline });
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
            totalLeadsInPreviousMonth,
            totalLeadsCLosedInPreviousMonth,
            totalLeadsOfTheMonth,
            totalLeadsClosedThisMonth,
        ] = await Promise.all([
            Leads.countDocuments({
                createdAt: { $gte: startOfPrevMonth, $lte: sameDayPrevMonth },
            }),
            Leads.countDocuments({
                status: { $eq: "Closed" },
                createdAt: { $gte: startOfPrevMonth, $lte: sameDayPrevMonth },
            }),
            Leads.countDocuments({
                createdAt: { $gte: startOfTheMonth, $lte: presentDate },
            }),
            Leads.countDocuments({
                status: { $eq: "Closed" },
                createdAt: { $gte: startOfTheMonth, $lte: presentDate },
            }),
        ]);

        const changeInLeads = safePercentageChange(
            totalLeadsOfTheMonth,
            totalLeadsInPreviousMonth,
        );

        const changeInClosedLeads = safePercentageChange(
            totalLeadsClosedThisMonth,
            totalLeadsCLosedInPreviousMonth,
        );

        const conversionRateInPrevMon = safeRate(
            totalLeadsCLosedInPreviousMonth,
            totalLeadsInPreviousMonth,
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
            changeInLeads,
            changeInClosedLeads,
            conversionRateThisMonth,
            changeInConversionRate,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default reportRouter;
