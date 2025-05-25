import React from "react";
import "../css/Header.css"; // Import file CSS
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";

const Header = () => {
  const [user, setUser] = useState(null); // Trạng thái người dùng: null (chưa đăng nhập) hoặc object (đã đăng nhập)
  const navigate = useNavigate();

  const handleLogin = () => {
    setUser({ name: "John Doe" });
    navigate("/");
  };

  const handleSignUp = () => {
    setUser({ name: "John Doe" });
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">
          Trang chủ
        </Link>
        <Link to="/products" className="nav-link">
          Sản phẩm
        </Link>
        <Link to="/about" className="nav-link">
          Giới thiệu
        </Link>
      </nav>

      {/* Menu icon for mobile */}
      <div className="menu-icon" style={{ color: "white" }}>
        <FaBars />
      </div>

      {/* Cart and user info/buttons */}
      <div className="user-actions">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm sản phẩm..."
          />
          <button type="submit" className="search-btn">
            <span className="search-icon">🔍</span>
          </button>
        </form>
        <Link to="/cart" className="cart">
          <FaShoppingCart className="cart-icon" />
          <span>Giỏ hàng</span>
        </Link>
        {/* Search bar */}
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="btn btn-logout">
              Đăng xuất
            </button>
          </div>
        ) : (
          <>
            <button onClick={handleLogin} className="btn btn-login">
              Đăng ký
            </button>
            <button onClick={handleSignUp} className="btn btn-signup">
              Đăng nhập
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
