import React from "react";
import "../css/Header.css"; // Import file CSS
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import RegisterDialog from "@/pages/RegisterDialog";
import LoginDialog from "@/pages/LoginDiaLog";
const Header = () => {
  const [user, setUser] = useState(null); // Trạng thái người dùng: null (chưa đăng nhập) hoặc object (đã đăng nhập)
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const handleLogin = () => {
    setShowLoginDialog(true);
  };

  const handleSignUp = () => {
    setShowRegisterDialog(true);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header>
      <div className="logo">Your Logo</div>
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
            <button onClick={handleLogin} className="btn btn-login">
              Login
            </button>
            <button onClick={handleSignUp} className="btn btn-signup">
              Sign Up
            </button>
          </>
        )}
      </div>

      
      {showLoginDialog && (
        <LoginDialog onClose={() => setShowLoginDialog(false)} />
      )}
      
      {showRegisterDialog && (
        <RegisterDialog onClose={() => setShowRegisterDialog(false)} />
      )}
    </header>
  );
};

export default Header;
