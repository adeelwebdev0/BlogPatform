import { Link } from "react-router-dom";
import type { Post } from "../types/blog.types";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
    {post.coverImage ? (
      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
    ) : (
      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl">
        📝
      </div>
    )}
    <div className="p-5 flex flex-col gap-2 flex-1">
      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
        {post.title}
      </h2>
      <p className="text-sm text-gray-500 line-clamp-3 flex-1">
        {post.content}
      </p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-400">
          By {post.author?.name} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <Link
          to={`/posts/${post._id}`}
          className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Read
        </Link>
      </div>
    </div>
  </div>
);

export default PostCard;
