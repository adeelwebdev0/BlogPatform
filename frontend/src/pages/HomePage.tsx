import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const { data, loading, page, setPage } = usePosts();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-xl h-72"
              />
            ))}
          </div>
        ) : data.posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">
            No posts yet. Be the first to write one!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
