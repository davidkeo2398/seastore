import React, { useContext, useState, useEffect } from "react";
import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import RegisterDialog from "@/pages/RegisterDialog";
import LoginDialog from "@/pages/LoginDiaLog";
import { AuthContext } from "@/context/AuthContext";
import { clearAuthToken } from "@/ultils/Authentication";

function MenuIcon(props) {
  return (
    <svg {...props} width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" x2="24" y1="8" y2="8" />
      <line x1="4" x2="24" y1="14" y2="14" />
      <line x1="4" x2="24" y1="20" y2="20" />
    </svg>
  );
}
function XIcon(props) {
  return (
    <svg {...props} width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="6" y1="6" x2="22" y2="22" />
      <line x1="22" y1="6" x2="6" y2="22" />
    </svg>
  );
}

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Đóng menu khi resize lên desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    console.log("User logged in:", userData);
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
      {/* Hamburger icon - only show on mobile */}
      <button
        className="hamburger-menu"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <XIcon /> : <MenuIcon />}
      </button>
      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div className="header-overlay" onClick={() => setMenuOpen(false)} />
      )}
      <nav className={`nav${menuOpen ? " nav-open" : ""}`} style={{ display: menuOpen || window.innerWidth > 768 ? 'flex' : 'none' }}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Trang chủ
        </Link>
        <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
          Giới thiệu
        </Link>
        <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>
          Sản phẩm
        </Link>
        <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
          Trang quản trị
        </Link>
         {/* <Link to="/orderTracking" className="nav-link">
          Trang theo dõi đơn hàng
        </Link> */}
        {/* 5 */}
      </nav>
      {/* Cart and user info/buttons */}
      <div className="user-actions">
        <Link to="/cart" className="cart">
          <FaShoppingCart className="cart-icon" />
          <span>Giỏ hàng</span>
        </Link>
        {user ? (
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

      
