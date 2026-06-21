import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { postService } from "../services/postService";
import type { PaginatedPosts } from "../types/blog.types";

export const usePosts = () => {
  const [data, setData] = useState<PaginatedPosts>({
    posts: [],
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await postService.getAll(page);
      setData(result);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { data, loading, page, setPage, refetch: fetchPosts };
};
