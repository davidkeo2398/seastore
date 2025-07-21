import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axiosInstance from "@/lib/axios";

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/order/my-order");
      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="text-yellow-600">Đang xử lý</span>;
      case "completed":
        return <span className="text-green-600">Hoàn thành</span>;
      case "cancelled":
        return <span className="text-red-600">Đã hủy</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailDialogOpen(true);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Theo dõi đơn hàng</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Tên đại lý</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead>Ngày đặt</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_code}</TableCell>
                <TableCell>{order.agency_name}</TableCell>
                <TableCell>{formatPrice(order.total)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.payment_method}</TableCell>
                <TableCell>{formatDate(order.order_date)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(order)}>Chi tiết</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Không có đơn hàng nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog Chi tiết đơn hàng */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>
          {selectedOrder ? (
            <div>
              <p><strong>Mã đơn hàng:</strong> {selectedOrder.order_code}</p>
              <p><strong>Tên đại lý:</strong> {selectedOrder.agency_name}</p>
              <p><strong>Địa chỉ:</strong> {selectedOrder.address_agency}</p>
              <p><strong>Số điện thoại:</strong> {selectedOrder.phone_agency}</p>
              <p><strong>Tổng tiền:</strong> {formatPrice(selectedOrder.total)}</p>
              <p><strong>Trạng thái:</strong> {getStatusBadge(selectedOrder.status)}</p>
              <p><strong>Phương thức thanh toán:</strong> {selectedOrder.payment_method}</p>
              <p><strong>Ngày đặt:</strong> {formatDate(selectedOrder.order_date)}</p>
            </div>
          ) : (
            <p>Không có thông tin chi tiết.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}