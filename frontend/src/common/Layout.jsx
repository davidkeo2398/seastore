import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
//import "../css/layout.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
