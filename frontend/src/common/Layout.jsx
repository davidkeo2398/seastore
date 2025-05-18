import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../css/layout.css";

export default function Layout() {
  return (
    <div className="layout-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
