import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  coverImage: string;
  author: mongoose.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPost>("Post", postSchema);
