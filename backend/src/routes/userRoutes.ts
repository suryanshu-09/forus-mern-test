import express from "express";
import { CreateUser, DeleteUser, LoginUser } from "../controllers/user";

export const userRouter = express.Router();

userRouter.post("/register", CreateUser);
userRouter.post("/login", LoginUser);
userRouter.delete("/", DeleteUser);
