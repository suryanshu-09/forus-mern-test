import express from "express";
import {
  CreateBlog,
  DeleteBlog,
  ReadAllBlogs,
  UpdateBlog,
} from "../controllers/blog";

export const blogRouter = express.Router();

blogRouter.post("/", CreateBlog);

blogRouter.get("/", ReadAllBlogs);

blogRouter.put("/:id", UpdateBlog);

blogRouter.delete("/:id", DeleteBlog);
