import { Request, Response } from "express";
import Post from "../models/post";

// GET all posts with pagination
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Post.countDocuments();
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// GET single post
export const getPostById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// POST create post
export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, content } = req.body;
    const coverImage = req.file ? (req.file as any).path : "";
    const post = await Post.create({
      title,
      content,
      coverImage,
      author: req.user?._id,
    });
    const populated = await post.populate("author", "name email");
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// PUT update post (only owner)
export const updatePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.author.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: "Not authorized to edit this post" });
      return;
    }

    const { title, content } = req.body;
    const coverImage = req.file ? (req.file as any).path : post.coverImage;

    post.title = title || post.title;
    post.content = content || post.content;
    post.coverImage = coverImage;

    const updated = await post.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// DELETE post (only owner)
export const deletePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post.author.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: "Not authorized to delete this post" });
      return;
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
