import cors from "cors"
import express from "express"
import { connectDB } from "./db/db.connect.js";
import agentRouter from "./routes/agents.route.js";

const app = express();
app.use(express.json());
const corsConfig = {
    origin: "*",
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsConfig));

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({ error: "database connection failed" })
    }
})

app.get("/", async (req, res) => {
    res.json({ message: "This is anvaya server" })
})

app.use("/api", agentRouter);

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
})