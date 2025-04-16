import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongo_url = process.env.MONGO_URI;

const db = mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB connected successfully");
    }).catch((err) => {
        console.error("MongoDB connection failed", err);
    });

export default db;