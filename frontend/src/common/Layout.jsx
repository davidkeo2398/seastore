import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="pt-[64px] pb-[64px]"> {/* Adjust padding to match header/footer height */}
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}