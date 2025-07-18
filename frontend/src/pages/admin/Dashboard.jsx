import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  Warehouse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardStats({ stats }) {
  if (!stats) return <div>Đang tải số liệu...</div>;
  const statsConfig = [
    {
      title: "Tổng sản phẩm",
      // controller trả về tổng số sản phẩm
      value: stats.totalProducts || 0,
      change: stats.productsChange,
      icon: Package,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-500",
      borderColor: "border-blue-200",
      link: "/admin/products", // Đường dẫn đến trang quản lý sản phẩm
    },
    {
      title: "Tổng đơn hàng",
      value: stats.totalOrders || 0,
      change: stats.ordersChange,
      icon: ShoppingCart,
      color: "bg-blue-700",
      lightColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      link: "/admin/orders", // Đường dẫn đến trang quản lý đơn hàng
    },
    {
      title: "Tổng người dùng",
      value: stats.totalUsers || 0,
      change: stats.usersChange,
      icon: Users,
      color: "bg-blue-800",
      lightColor: "bg-blue-50",
      textColor: "text-blue-800",
      borderColor: "border-blue-200",
      link: "/admin/users", // Đường dẫn đến trang quản lý người dùng
    },
    // {
    //   title: "Tổng danh mục",
    //   value: stats.totalCategories || 0,
    //   change: stats.categoriesChange,
    //   icon: TrendingUp,
    //   color: "bg-blue-600",
    //   lightColor: "bg-blue-50",
    //   textColor: "text-blue-600",
    //   borderColor: "border-blue-200",
    //   link: "/admin/categories", // Đường dẫn đến trang quản lý danh mục
    // },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  lightColor,
  textColor,
  borderColor,
  link, // Thêm thuộc tính link
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link); // Điều hướng đến đường dẫn được chỉ định
    }
  };

  return (
    //relative: định vị vị trí tương đối cho Card
    //overflow-hidden: ẩn phần nội dung tràn ra ngoài Card
    //transition-all duration-300: Thêm hiệu ứng chuyển đổi mượt mà trong 300ms khi hover.
    <Card
      className={`relative bg-white overflow-hidden border-2 ${borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
      onClick={handleClick} // Thêm sự kiện onClick
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${lightColor} rounded-full -translate-y-16 translate-x-16 opacity-30`}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-700">
          {title}
        </CardTitle>
        <div className={`p-3 rounded-xl ${lightColor} border ${borderColor}`}>
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
      </CardHeader>
      {/*  phần giá trị của Card */}
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold text-gray-900">
            {value.toLocaleString()}
          </div>
        </div>
      </CardContent>

      <div className={`h-1 w-full ${color}`} />
    </Card>
  );
}
