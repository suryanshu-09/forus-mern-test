import { Request, Response } from "express";
import { Blog } from "../db/db";

export const CreateBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, thumbnail, userId } = req.body;

    const blog = new Blog({ title, content, thumbnail, author: userId });
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
    const { userId } = req.body;

    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    res
      .status(500)
      .json("Was not able to fetch any blogs. Please try again in a few.");
  }
};

export const ReadBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ err: "Could not find the blog by that Id." });
  }
};

export const UpdateBlog = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
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
    const { userId } = req.body;
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: userId,
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
