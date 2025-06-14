import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { clearAuthToken } from "@/ultils/Authentication";

export const AuthContext = createContext();

export const AuthProvider = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Check for token in cookies on mount
  //   const token = document.cookie
  //     .split('; ')
  //     .find(row => row.startsWith('token='))
  //     ?.split('=')[1];

  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       setUser({ iduser: decoded.iduser, isAdmin: decoded.isAdmin });
  //     } catch (error) {
  //       console.error('Invalid token', error);
  //       setUser(null);
  //     }
  //   }
  // };

  const logout = () => {
    // Remove token from cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    clearAuthToken();
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
