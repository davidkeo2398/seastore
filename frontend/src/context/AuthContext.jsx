import { createContext } from "react";
// quản lý người dùng trong ứng dụng
export const AuthContext = createContext({
  user: null,
  setUser: () => {}, 
  // truyeenf xuống components để cập nhật người dùng qua AuthProvider ở page Auth 
});

