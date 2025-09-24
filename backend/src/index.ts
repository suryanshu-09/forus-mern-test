import express from "express";
import dotenv from "dotenv";
import { blogRouter } from "./routes/blogRoutes";
import { userRouter } from "./routes/userRoutes";
import mongoose from "mongoose";
import cors from "cors";
import { auth } from "./middleware/auth";
import path from "path";

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

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}

app.use("/user", userRouter);
app.use("/api/posts", auth, blogRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
