// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import AdminLayout from "./components/AdminLayout";
import DashboardStats from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import LoginDialog from "./pages/LoginDiaLog";
import axiosInstance from '@/lib/axios';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterDialog";

function App() {
    const { user, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
    <header className="flex justify-end p-4">
        {user && (
          <Button onClick={logout} variant="secondary">
            Đăng xuất
          </Button>
        )}
      </header>
      <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginDialog/>} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardStats />} />
          <Route path="dashboard" element={<DashboardStats />} />
        </Route>
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
