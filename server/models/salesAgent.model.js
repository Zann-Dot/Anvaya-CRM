import { model, Schema } from "mongoose";

const SalesAgentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Sales Agent name is required'],
    },
    email: {
        type: String,
        required: [true, 'Sales Agent email is required'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export const SalesAgent = model('SalesAgent', SalesAgentSchema);