import React, { useContext, useState } from "react";
import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import RegisterDialog from "@/pages/RegisterDialog";
import LoginDialog from "@/pages/LoginDiaLog";
import { AuthContext } from "@/context/AuthContext";
import { clearAuthToken, getAuthToken } from "@/ultils/Authentication";

const Header = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  // const userLoggedIn = useContext(AuthContext);

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    console.log("User logged in:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
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
    localStorage.clear();
    navigate('/')
  };

  // Hiển thị giao diện
  return (
    <header>
      <Link to="/" className="logo">
        <img
          src="/images/whale_5729775.png"
          alt="Logo"
          className="logo-image w-12 h-12"
        />
      </Link>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Trang chủ
        </Link>
        <Link to="/about" className="nav-link">
          Giới thiệu
        </Link>
        <Link to="/products" className="nav-link">
          Sản phẩm
        </Link>
        <Link to="/admin" className="nav-link">
          Trang quản trị
        </Link>
        <Link to="/orderTracking" className="nav-link">
          Trang theo dõi đơn hàng
        </Link>
        {/* 5 */}
      </nav>
      {/* Cart and user info/buttons */}
      <div className="user-actions">
        <Link to="/cart" className="cart">
          <FaShoppingCart className="cart-icon" />
          <span>Giỏ hàng</span>
        </Link>
        {getAuthToken() ? (
          <div className="user-info flex items-center gap-4 w-auto">
            <span>Xin chào, {user.user_name}!</span>
            <button onClick={handleLogout} className="btn btn-logout">
              Đăng xuất
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setShowLoginDialog(true)}
              className="btn btn-login"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setShowRegisterDialog(true)}
              className="btn btn-signup"
            >
              Đăng ký
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
