import express from "express";
import { SalesAgent } from "../models/salesAgent.model.js";
import { Leads } from "../models/leads.model.js";
import { Comments } from "../models/comments.model.js";
const commentRouter = express.Router();

commentRouter.post("/leads/:id/comments", async (req, res) => {
    try {
        const leadId = req.params.id;
        const { author, commentText } = req.body;

        if (!leadId || !author)
            return res.status(404).json({ error: "Required both lead and author" });

        if (!commentText || typeof commentText !== "string")
            return res.status(404).json({ error: "Comment text must be a string" });

        const selectedLead = await Leads.findById(leadId);
        if (!selectedLead)
            return res
                .status(404)
                .json({ error: `Lead with ID '${leadId}' not found.` });

        const selectedAuthor = await SalesAgent.findById(author);
        if (!selectedAuthor)
            return res
                .status(404)
                .json({ error: `Lead with ID '${author}' not found.` });

        const comment = await Comments.create({
            leadId,
            author,
            commentText,
        });

        res.json({
            success: true,
            message: "Comment added successfully",
            comment,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

commentRouter.get("/leads/:id/comments", async (req, res) => {
    try {
        const comments = await Comments.find({ leadId: req.params.id }).populate(
            "author",
        );

        if (!Array.isArray(comments) || !comments)
            return res.status(404).json({ error: "No comments found" });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default commentRouter;
