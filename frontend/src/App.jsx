// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import AdminLayout from "./components/AdminLayout";
import DashboardStats from "./pages/admin/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<Login/>} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardStats />} />
          <Route path="dashboard" element={<DashboardStats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
