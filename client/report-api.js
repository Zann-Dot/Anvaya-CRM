
reportRouter.get("/report/source-distribution", async (req, res) => {
    try {
        const startDate = req.dateFilter.createdAt.$gte;
        const endDate = req.dateFilter.createdAt.$lte;
        const report = await Leads.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: "$source",
                    leadCount: { $sum: 1 },
                    closedCount: {
                        $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    source: "$_id",
                    leadCount: 1,
                    closedCount: 1,
                },
            },
        ]);

        res.json(report || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

reportRouter.get("/report/priority-distribution", async (req, res) => {
    try {
        const startDate = req.dateFilter.createdAt.$gte;
        const endDate = req.dateFilter.createdAt.$lte;
        const report = await Leads.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: "$priority",
                    leadCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    priority: "$_id",
                    leadCount: 1,
                },
            },
        ]);

        res.json(report || []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
