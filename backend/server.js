import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import roommateRoutes from "./routes/roommate.js";
import userRoutes from "./routes/user.js";

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