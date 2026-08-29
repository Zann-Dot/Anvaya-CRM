import { model, Schema } from "mongoose"

function capitalizeString(str) {
    if (!str) return;
    return str
        .split(/\s+/)
        .map(string => string.slice(0, 1).toUpperCase() + string.slice(1))
        .join(" ")
}

const LeadSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Lead contact name is required'],
        set: capitalizeString,
        index: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        set: capitalizeString,
        index: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        index: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email address"]
    },
    avatar: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
    },
    source: {
        type: String,
        required: [true, 'Lead source is required'],
        enum: ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'],
    },
    salesAgent: {
        type: Schema.Types.ObjectId,
        ref: 'SalesAgent',
        required: [true, 'Sales Agent is required'],
    },
    status: {
        type: String,
        required: true,
        enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed'],
        default: 'New',
    },
    tags: {
        type: [String],
    },
    timeToClose: {
        type: Number,
        required: [true, 'Time to Close is required'],
        min: [1, 'Time to Close must be a positive number'],
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
    priorityWeight: {
        type: Number,
        default: 2
    },
    closedAt: {
        type: Date,
    },
}, { timestamps: true });

LeadSchema.pre("save", async function () {
    const weight = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    this.priorityWeight = weight[this.priority] || 2;
});

LeadSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();
    const priority = update.priority || (update.$set && update.$set.priority);

    if (priority) {
        const weight = { High: 1, Medium: 2, Low: 3 };
        const calculateWeight = weight[priority] || 2
        if (update.$set) {
            update.$set.priorityWeight = calculateWeight
        } else {
            update.priorityWeight = calculateWeight
        }
    }
})

export const Leads = model('Lead', LeadSchema);
