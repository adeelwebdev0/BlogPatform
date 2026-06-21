export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  author: Author;
  createdAt: string;
}

export interface PaginatedPosts {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  total: number;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: RegisterDTO) => Promise<void>;
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
}
