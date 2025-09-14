import express from "express";
import {
  CreateBlog,
  DeleteBlog,
  ReadAllBlogs,
  ReadBlog,
  UpdateBlog,
} from "../controllers/blog";

export const blogRouter = express.Router();

blogRouter.post("/", CreateBlog);

blogRouter.get("/", ReadAllBlogs);

blogRouter.get("/read/:id", ReadBlog);

blogRouter.put("/:id", UpdateBlog);

blogRouter.delete("/:id", DeleteBlog);
