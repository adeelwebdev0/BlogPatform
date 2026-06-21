import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "react-toastify";
import { authService } from "../services/authService";
import type {
  User,
  RegisterDTO,
  LoginDTO,
  AuthContextType,
} from "../types/blog.types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = async (data: RegisterDTO) => {
    try {
      const user = await authService.register(data);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Welcome, ${user.name}!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const login = async (data: LoginDTO) => {
    try {
      const user = await authService.login(data);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
