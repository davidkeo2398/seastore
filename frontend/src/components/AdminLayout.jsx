import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Warehouse,
} from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white border-r border-blue-100 shadow-sm">
        <div className="h-16 flex items-center px-6 bg-blue-600">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Tép Bạc Admin
          </h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 bg-white">
          <Link to="/admin/dashboard">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50"
            >
              <LayoutDashboard className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              Dashboard
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50"
            >
              <Package className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              Quản lý sản phẩm
            </Button>
          </Link>
          <Link to="/admin/warehouse">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50"
            >
              <Warehouse className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              Quản lý kho
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50"
            >
              <ShoppingCart className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              Quản lý đơn hàng
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50"
            >
              <Users className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              Quản lý người dùng
            </Button>
          </Link>
          <Link to="/admin/adminrank">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-blue-700 hover:bg-blue-50"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
              Quản lý hạng thành viên
            </Button>
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-200">
            <Link to="/">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Quay lại trang chủ
              </Button>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
