import axios from "axios";
import type { Post, PaginatedPosts } from "../types/blog.types";

const BASE = "/api/posts";

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const postService = {
  getAll: async (page = 1): Promise<PaginatedPosts> => {
    const res = await axios.get<PaginatedPosts>(`${BASE}?page=${page}&limit=6`);
    return res.data;
  },

  getById: async (id: string): Promise<Post> => {
    const res = await axios.get<Post>(`${BASE}/${id}`);
    return res.data;
  },

  create: async (formData: FormData, token: string): Promise<Post> => {
    const res = await axios.post<Post>(BASE, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  update: async (
    id: string,
    formData: FormData,
    token: string,
  ): Promise<Post> => {
    const res = await axios.put<Post>(`${BASE}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  delete: async (id: string, token: string): Promise<void> => {
    await axios.delete(`${BASE}/${id}`, authHeader(token));
  },
};
