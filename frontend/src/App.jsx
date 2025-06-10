// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import AdminLayout from "./components/AdminLayout";
import DashboardStats from "./pages/admin/Dashboard";
import Login from "./pages/Login";
import LoginDialog from "./pages/LoginDiaLog";
import axiosInstance from "@/lib/axios";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterDialog";
import ProductDetailPage from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import UsersPage from "./pages/admin/User";
import ProductsPage from "./pages/admin/Product";
import WarehousePage from "./pages/admin/Warehouse";
import OrdersPage from "./pages/admin/Orders";
import PayCheckout from "./pages/PayCheckout";
import BuyerRight from "./common/BuyerRight";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import AdminAngencyRank from "./pages/admin/Rank";
import AgencyRankPage from "./pages/AngencyRank";
import OrderTracking from "./pages/OrderTracking";


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
            <Route path="login" element={<LoginDialog />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="paycheckout" element={<PayCheckout />} />
            <Route path="BuyerRight" element={<BuyerRight />} />
            <Route path="*" element={<NotFound />} />\
            <Route path="rank" element={<AgencyRankPage />} />
            <Route path="orderTracking" element={<OrderTracking />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardStats />} />
            <Route path="dashboard" element={<DashboardStats />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="warehouse" element={<WarehousePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="adminrank" element={<AdminAngencyRank/>} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
