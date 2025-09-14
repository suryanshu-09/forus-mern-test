import express from "express";
import { CreateUser, DeleteUser, LoginUser } from "../controllers/user";
import { auth } from "../middleware/auth";

export const userRouter = express.Router();

userRouter.post("/register", CreateUser);
userRouter.post("/login", LoginUser);
userRouter.delete("/", auth, DeleteUser);
