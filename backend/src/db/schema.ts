import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: {
    type: Array<mongoose.Schema.Types.ObjectId>,
    required: false,
    ref: "Blog",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePasswords = async function (
  canditatePassword: string,
) {
  return await bcrypt.compare(canditatePassword, this.password);
};

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array<String>,
      required: false,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Blog = mongoose.model("Blog", blogSchema);
export const User = mongoose.model("User", userSchema);
