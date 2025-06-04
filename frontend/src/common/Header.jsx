import React, { useContext, useState } from "react";
import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import RegisterDialog from "@/pages/RegisterDialog";
import LoginDialog from "@/pages/LoginDiaLog";
import { AuthContext } from "@/context/AuthContext";
import { clearAuthToken } from "@/ultils/Authentication";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  // const userLoggedIn = useContext(AuthContext);

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLoginDialog(false);
  };

  // Xử lý đăng ký thành công
  const handleRegisterSuccess = (userData) => {
    setUser(userData);
    setShowRegisterDialog(false);
  };

  // Đăng xuất
  const handleLogout = () => {
    setUser(null);
    clearAuthToken();
  };

  // Hiển thị giao diện
  return (
    <header>
      <Link to ="/" className="logo">
        <img
          src="/images/whale_5729775.png"
          alt="Logo"
          className="logo-image w-12 h-12"
        />
      </Link>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/admin" className="nav-link">
          Trang quản trị
        </Link>
        <Link to="/productdetail" className="nav-link">
          Product Detail
        </Link>
      </nav>
      {/* Cart and user info/buttons */}
      <div className="user-actions">
        <Link to="/cart" className="cart">
          <FaShoppingCart className="cart-icon" />
          <span>Cart</span>
        </Link>
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowLoginDialog(true)}
              className="btn btn-login"
            >
              Login
            </button>
            <button
              onClick={() => setShowRegisterDialog(true)}
              className="btn btn-signup"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
      {showLoginDialog && (
        <LoginDialog
          onClose={() => setShowLoginDialog(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showRegisterDialog && (
        <RegisterDialog
          onClose={() => setShowRegisterDialog(false)}
          onRegisterSuccess={handleRegisterSuccess}
          // Truyền thêm hàm mở LoginDialog nếu muốn chuyển qua lại giữa 2 dialog
          onShowLogin={() => {
            setShowRegisterDialog(false);
            setShowLoginDialog(true);
          }}
        />
      )}
    </header>
  );
};

export default Header;

      
