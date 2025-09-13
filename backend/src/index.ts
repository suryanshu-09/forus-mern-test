import express from "express";
import dotenv from "dotenv";
import { blogRouter } from "./routes/blogRoutes";
import { userRouter } from "./routes/userRoutes";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB_URL || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => {
    console.error("Error Connecting to the DB");
    process.exit(1);
  });

app.use(cors());
app.use("/api/posts", blogRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
