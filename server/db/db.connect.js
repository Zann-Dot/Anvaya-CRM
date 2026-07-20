import { configDotenv } from "dotenv"
import { connect, connections } from "mongoose";
configDotenv();
const mongoUri = process.env.MONGODB;
console.log(mongoUri);

export const connectDB = async () => {
    if (connections[0].readyState) return;
    await connect(mongoUri)
        .then(() => console.log("Connected to database"))
        .catch((error) => console.log("Error occured while connecting to database", error));
};
