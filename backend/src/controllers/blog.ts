import { Request, Response } from "express";
import { Blog } from "../db/schema";
import { blogInput } from "@suryanshu-09/fe-mern-common";

export const CreateBlog = async (req: Request, res: Response) => {
  try {
    const { success } = blogInput.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ err: "Invalid input." });
    }
    const { title, content, thumbnail, tags } = req.body;

    const userId = (req as any).user.id;

    const blog = new Blog({ title, content, thumbnail, author: userId, tags });
    await blog.save();
    res.status(201).json({ msg: `Blog ${title} uploaded successfully.` });
  } catch (error) {
    res
      .status(400)
      .json({ err: "Unable to post your blog. Please try again in a few." });
  }
};

export const ReadAllBlogs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    res
      .status(500)
      .json("Was not able to fetch any blogs. Please try again in a few.");
  }
};

export const UpdateBlog = async (req: Request, res: Response) => {
  try {
    const { success } = blogInput.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ err: "Invalid input." });
    }

    const userId = (req as any).user.id;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: userId },
      req.body,
      {
        new: true,
      },
    );

    if (!blog) {
      return res.status(404).json({ err: "Sorry, post not found." });
    }

    res.status(200).json({ blog });
  } catch (error) {
    res
      .status(500)
      .json({ err: "Could not update the blog. Please try again in a few." });
  }
};

export const DeleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: (req as any).user.id,
    });
    if (!blog) {
      return res.status(404).json({ err: "Sorry, post not found." });
    }
    res.status(200).json({ msg: "Post deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ err: "Encountered an error whilst deleting the post." });
  }
};
