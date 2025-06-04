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
      {/* Nút nổi Zalo */}
      <a
        href="https://zalo.me/0337586860" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg p-3 flex items-center justify-center"
        style={{ width: 56, height: 56 }}
      >
        <img
          src="images/icons8-zalo-48.png"
          alt="Zalo"
          className="w-8 h-8"
        />
      </a>
    </div>
  );
};

export default Layout;
