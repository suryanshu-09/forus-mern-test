import { Request, Response } from "express";
import { User } from "../db/schema";
import jwt from "jsonwebtoken";
import {
  registerInput,
  loginInput,
  deleteInput,
} from "@suryanshu-09/fe-mern-common";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { success } = registerInput.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ err: "Invalid input." });
    }
    const { name, email, password } = req.body;
    const user = new User({ name, email, password, blogs: [] });
    await user.save();
    res.status(201).json({ msg: "User created successfully." });
  } catch (error: any) {
    res
      .status(500)
      .json({ err: "Error encountered whilst creating the user." });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const { success } = loginInput.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ err: "Invalid input." });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePasswords(password))) {
      return res.status(401).json({ err: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET || "secret", {
      expiresIn: "10h",
    });
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ err: "Error encountered whilst loggging in." });
  }
};

export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { success } = deleteInput.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ err: "Invalid input." });
    }
    const { email, userId } = req.body;
    const user = User.findOneAndDelete({ email, _id: userId });
    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }
    res.status(200).json({ msg: "successfully deleted the user." });
  } catch (error) {
    res.status(500).json({ err: "Error whilst deleting the user." });
  }
};
