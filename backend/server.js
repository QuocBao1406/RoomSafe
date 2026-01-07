import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import roommateRoutes from "./routes/roommate.js";
import userRoutes from "./routes/user.js";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import adminRoutes from "./routes/admin.js";
import aiRoutes from "./routes/ai.js";
import paymentRoutes from "./routes/payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.join(__dirname, '../.env')});

BigInt.prototype.toJSON = function () {
    return this.toString();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/roommates", roommateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
})