import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
        required: [true, 'Lead reference is required'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalesAgent',
        required: [true, 'Author is required'],
    },
    commentText: {
        type: String,
        required: [true, 'Comment text is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const Comments = model("Comments", CommentSchema);