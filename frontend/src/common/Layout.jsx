import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
//import "../css/layout.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-background text-foreground">
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
        className="fixed z-50 flex items-center justify-center p-3 bg-blue-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-600"
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
