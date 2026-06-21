import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          BlogPlatform
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:inline">
                Hi, {user.name}
              </span>
              <Link
                to="/create"
                className="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                New Post
              </Link>
              <button
                onClick={logout}
                className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
