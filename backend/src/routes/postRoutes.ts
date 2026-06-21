import express from "express";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", protect, upload.single("coverImage"), createPost);
router.put("/:id", protect, upload.single("coverImage"), updatePost);
router.delete("/:id", protect, deletePost);

export default router;
