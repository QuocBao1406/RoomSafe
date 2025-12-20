import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import roommateRoutes from "./routes/roommate.js";
import userRoutes from "./routes/user.js";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.join(__dirname, '../.env')});

console.log("------------------------------------------------");
console.log("--> Đường dẫn file .env:", path.join(__dirname, '../.env'));
console.log("--> Trạng thái JWT_SECRET:", process.env.JWT_SECRET ? "ĐÃ LOAD OK (Thành công)" : "VẪN LỖI (Undefined)");
console.log("------------------------------------------------");

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

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
})