import { model, Schema } from "mongoose";

const TagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const Tags = model("Tags", TagSchema);