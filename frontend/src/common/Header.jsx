import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null); // Trạng thái người dùng: null (chưa đăng nhập) hoặc object (đã đăng nhập)
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mô phỏng đăng nhập
    setUser({ name: "John Doe" });
    navigate("/");
  };

  const handleSignUp = () => {
    // Mô phỏng đăng ký
    setUser({ name: "John Doe" });
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="space-x-6">
        <Link to="/" className="hover:text-gray-300 transition duration-200">
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-gray-300 transition duration-200"
        >
          About
        </Link>
        <Link
          to="/products"
          className="hover:text-gray-300 transition duration-200"
        >
          Products
        </Link>
      </nav>

      {/* Nút hoặc thông tin người dùng bên phải */}
      <div className="space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user.name}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-200"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition duration-200"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
