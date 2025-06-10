"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  RefreshCw,
  ArrowLeft,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const statusConfig = {
  pending: {
    label: "Chờ xác nhận",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  confirmed: {
    label: "Đã xác nhận",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  processing: {
    label: "Đang xử lý",
    color: "bg-purple-100 text-purple-800",
    icon: Package,
  },
  shipped: {
    label: "Đang giao hàng",
    color: "bg-orange-100 text-orange-800",
    icon: Truck,
  },
  delivered: {
    label: "Đã giao hàng",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Đã hủy",
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
  },
};

const paymentStatusConfig = {
  pending: { label: "Chờ thanh toán", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Đã thanh toán", color: "bg-green-100 text-green-800" },
  failed: { label: "Thanh toán thất bại", color: "bg-red-100 text-red-800" },
  refunded: { label: "Đã hoàn tiền", color: "bg-gray-100 text-gray-800" },
};

// Status progression order
const statusOrder = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
];
const paymentStatusOrder = ["pending", "paid", "failed", "refunded"];

export default function OrderTrackingWithCheckboxes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [statusChanges, setStatusChanges] = useState({}); // Track status changes
  const [savingChanges, setSavingChanges] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockOrders = [
          {
            id: "1",
            orderNumber: "ORD-2024-001",
            status: "processing",
            paymentStatus: "pending",
            total: 2500000,
            createdAt: "2024-01-15T10:30:00Z",
            estimatedDelivery: "2024-01-20T00:00:00Z",
            items: [
              {
                id: "1",
                name: "Premium Wireless Headphones",
                quantity: 1,
                price: 2500000,
                image: "/placeholder.svg?height=60&width=60",
              },
            ],
            shippingAddress: {
              name: "Nguyễn Văn A",
              phone: "0123456789",
              address: "123 Đường ABC, Phường XYZ",
              city: "TP. Hồ Chí Minh",
              district: "Quận 1",
            },
            paymentMethod: "Chuyển khoản ngân hàng",
          },
          {
            id: "2",
            orderNumber: "ORD-2024-002",
            status: "delivered",
            paymentStatus: "paid",
            total: 1800000,
            createdAt: "2024-01-10T14:20:00Z",
            estimatedDelivery: "2024-01-15T00:00:00Z",
            items: [
              {
                id: "2",
                name: "Bluetooth Speaker Pro",
                quantity: 1,
                price: 1800000,
                image: "/placeholder.svg?height=60&width=60",
              },
            ],
            shippingAddress: {
              name: "Trần Thị B",
              phone: "0987654321",
              address: "456 Đường DEF, Phường UVW",
              city: "Hà Nội",
              district: "Quận Ba Đình",
            },
            paymentMethod: "Ví điện tử MoMo",
          },
        ];

        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = (orderId, statusType, newStatus, checked) => {
    if (!checked) return; // Only handle checking, not unchecking

    setStatusChanges((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [statusType]: newStatus,
      },
    }));

    // Update the order in state immediately for UI feedback
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, [statusType]: newStatus } : order
      )
    );
  };

  const handlePayment = async (orderId) => {
    setPaymentProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, paymentStatus: "paid" } : order
        )
      );

      alert("Thanh toán thành công!");
    } catch (error) {
      console.error("Payment error:", error);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const saveStatusChanges = async () => {
    setSavingChanges(true);
    try {
      // Simulate API call to save changes
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would make actual API calls to update the orders
      console.log("Saving status changes:", statusChanges);

      setStatusChanges({}); // Clear pending changes
      alert("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Lỗi khi cập nhật trạng thái!");
    } finally {
      setSavingChanges(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      !searchOrderId ||
      order.orderNumber.toLowerCase().includes(searchOrderId.toLowerCase())
  );

  const hasUnsavedChanges = Object.keys(statusChanges).length > 0;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý đơn hàng
            </h1>
            <p className="text-gray-600 mt-1">
              Cập nhật và theo dõi trạng thái đơn hàng
            </p>
          </div>
          <div className="flex gap-3">
            {hasUnsavedChanges && (
              <Button
                onClick={saveStatusChanges}
                disabled={savingChanges}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="mr-2 h-4 w-4" />
                {savingChanges ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            )}
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </div>
        </div>

        {/* Unsaved Changes Alert */}
        {hasUnsavedChanges && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-orange-800">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span className="font-medium">
                  Bạn có {Object.keys(statusChanges).length} thay đổi chưa lưu
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Tìm kiếm đơn hàng</Label>
                <Input
                  id="search"
                  placeholder="Nhập mã đơn hàng..."
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Làm mới
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy đơn hàng
                </h3>
                <p className="text-gray-600">
                  Bạn chưa có đơn hàng nào hoặc mã đơn hàng không đúng.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              const hasChanges = statusChanges[order.id];

              return (
                <Card
                  key={order.id}
                  className={`overflow-hidden ${
                    hasChanges ? "border-orange-300 shadow-md" : ""
                  }`}
                >
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Đơn hàng #{order.orderNumber}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Đặt hàng: {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusConfig[order.status].color}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[order.status].label}
                        </Badge>
                        <Badge
                          className={
                            paymentStatusConfig[order.paymentStatus].color
                          }
                        >
                          {paymentStatusConfig[order.paymentStatus].label}
                        </Badge>
                        {hasChanges && (
                          <Badge className="bg-orange-100 text-orange-800">
                            Có thay đổi
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Order Items */}
                      <div>
                        <h4 className="font-medium mb-3">Sản phẩm đã đặt</h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-3"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded border"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Số lượng: {item.quantity}
                                </p>
                              </div>
                              <span className="text-sm font-medium">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Management */}
                      <div>
                        <h4 className="font-medium mb-3">
                          Cập nhật trạng thái
                        </h4>

                        {/* Order Status Checkboxes */}
                        <div className="space-y-3 mb-4">
                          <Label className="text-sm font-medium text-gray-700">
                            Trạng thái đơn hàng:
                          </Label>
                          {statusOrder.map((status) => {
                            const StatusIcon = statusConfig[status].icon;
                            const isCurrentStatus = order.status === status;
                            const isCompleted =
                              statusOrder.indexOf(order.status) >=
                              statusOrder.indexOf(status);

                            return (
                              <div
                                key={status}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${order.id}-${status}`}
                                  checked={isCurrentStatus}
                                  onCheckedChange={(checked) =>
                                    handleStatusChange(
                                      order.id,
                                      "status",
                                      status,
                                      checked
                                    )
                                  }
                                  disabled={
                                    status === "cancelled" &&
                                    order.status !== "cancelled"
                                  }
                                />
                                <Label
                                  htmlFor={`${order.id}-${status}`}
                                  className={`text-sm flex items-center cursor-pointer ${
                                    isCompleted
                                      ? "text-green-700"
                                      : "text-gray-600"
                                  }`}
                                >
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {statusConfig[status].label}
                                </Label>
                              </div>
                            );
                          })}
                        </div>

                        {/* Payment Status Checkboxes */}
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-gray-700">
                            Trạng thái thanh toán:
                          </Label>
                          {paymentStatusOrder.map((paymentStatus) => {
                            const isCurrentPaymentStatus =
                              order.paymentStatus === paymentStatus;

                            return (
                              <div
                                key={paymentStatus}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${order.id}-payment-${paymentStatus}`}
                                  checked={isCurrentPaymentStatus}
                                  onCheckedChange={(checked) =>
                                    handleStatusChange(
                                      order.id,
                                      "paymentStatus",
                                      paymentStatus,
                                      checked
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`${order.id}-payment-${paymentStatus}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {paymentStatusConfig[paymentStatus].label}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Shipping & Payment Info */}
                      <div>
                        <h4 className="font-medium mb-3">
                          Thông tin giao hàng
                        </h4>
                        <div className="text-sm space-y-1 mb-4">
                          <p className="font-medium">
                            {order.shippingAddress.name}
                          </p>
                          <p>{order.shippingAddress.phone}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.district},{" "}
                            {order.shippingAddress.city}
                          </p>
                        </div>

                        <div className="text-sm">
                          <p className="text-gray-600">
                            Phương thức thanh toán:
                          </p>
                          <p className="font-medium">{order.paymentMethod}</p>
                        </div>

                        {order.status === "shipped" && (
                          <div className="mt-3 text-sm">
                            <p className="text-gray-600">Dự kiến giao hàng:</p>
                            <p className="font-medium text-green-600">
                              {formatDate(order.estimatedDelivery)}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Order Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold">
                        Tổng cộng:{" "}
                        <span className="text-blue-600">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
