import axios from "axios";
import type { User, RegisterDTO, LoginDTO } from "../types/blog.types";

const BASE = "/api/auth";

export const authService = {
  register: async (data: RegisterDTO): Promise<User> => {
    const res = await axios.post<User>(`${BASE}/register`, data);
    return res.data;
  },
  login: async (data: LoginDTO): Promise<User> => {
    const res = await axios.post<User>(`${BASE}/login`, data);
    return res.data;
  },
};
