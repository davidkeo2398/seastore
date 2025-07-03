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

export default function DashboardStats({ stats }) {
  if (!stats) return <div>Đang tải số liệu...</div>;
  const statsConfig = [
    {
      title: "Tổng sản phẩm",
      value: stats.totalProducts || 0,
      change: stats.productsChange,
      icon: Package,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-500",
      borderColor: "border-blue-200",
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
    },
    // {
    //   title: "Tổng hạng thành viên",
    //   value: stats.totalMemberships || 0,
    //   change: stats.membershipChange,
    //   icon: Warehouse,
    //   color: "bg-blue-600",
    //   lightColor: "bg-blue-50",
    //   textColor: "text-blue-600",
    //   borderColor: "border-blue-200",
    // },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
}) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card
      className={`relative bg-white overflow-hidden border-2 ${borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      {/* Gradient Circle Background */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${lightColor} rounded-full -translate-y-16 translate-x-16 opacity-30`}
      />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">
          {title}
        </CardTitle>
        <div className={`p-3 rounded-xl ${lightColor} border ${borderColor}`}>
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold text-gray-900">
            {value.toLocaleString()}
          </div>

          {/* {change !== undefined && (
            <div className="flex items-center space-x-1">
              {isPositive && (
                <>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <Badge className="bg-green-50 text-green-700 border border-green-200">
                    +{change}%
                  </Badge>
                </>
              )}
              {isNegative && (
                <>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <Badge className="bg-red-50 text-red-700 border border-red-200">
                    {change}%
                  </Badge>
                </>
              )}
              {change === 0 && (
                <Badge className="bg-gray-50 text-gray-700 border border-gray-200">
                  0%
                </Badge>
              )}
            </div>
          )} */}
        </div>
      </CardContent>

      {/* Accent Bar */}
      <div className={`h-1 w-full ${color}`} />
    </Card>
  );
}
