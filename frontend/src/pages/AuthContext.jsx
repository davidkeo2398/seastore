import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext(); // Tạo context cho xác thực người dùng

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const isAdmin = query.get("isAdmin") === "1";
    // đăngg nhập
    if (token) {
      // đăng nhập từ trang khác
      try {
        const decoded = jwtDecode(token);
        setUser({ iduser: decoded.iduser, isAdmin: decoded.isAdmin });
        document.cookie = `token=${token}; max-age=14400; path=/`;
        navigate(isAdmin ? "/admin" : "/home");
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
      }
    } else {
      // đã đăng nhập từ trước chưa cần đăng nhập lại
      const storedToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken); // Giải mã token
          setUser({ iduser: decoded.iduser, isAdmin: decoded.isAdmin });
        } catch (error) {
          console.error("Invalid token", error);
          setUser(null);
        }
      }
    }
  }, [location, navigate]);

  const logout = () => {
    // Xóa token khỏi cookie và trạng thái người dùng = đặt ngày hết hạn token về quá khứ để đăng xuất
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};