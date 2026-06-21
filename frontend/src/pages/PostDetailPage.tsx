import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postService } from "../services/postService";
import { useAuth } from "../hooks/useAuth";
import type { Post } from "../types/blog.types";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await postService.getById(id!);
        setPost(data);
      } catch {
        toast.error("Post not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await postService.delete(id!, user!.token);
      toast.success("Post deleted!");
      navigate("/");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (!post) return null;

  const isOwner = user?._id === post.author._id;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            By{" "}
            <span className="font-medium text-gray-600">
              {post.author.name}
            </span>{" "}
            • {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {isOwner && (
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
              <Link
                to={`/edit/${post._id}`}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm transition"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
