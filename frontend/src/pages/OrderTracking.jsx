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
import axiosInstance from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";

export default function OrderTrackingWithCheckboxes() {
  const location = useLocation();
  const { order: createdOrder } = location.state || {}; // Lấy order từ location.state

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrderId, setSearchOrderId] = useState( //tìm kiếm theo mã đơn hàng
    createdOrder?.order_id?.toString() || ""
  ); // Khởi tạo từ createdOrder
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/order/my-order");
      if (response.data && response.data.data.length > 0) {
        setOrders(response.data.data); //câp nhật danh sách đơn hàng
        setLoading(false);
      } else { // Nếu không có đơn hàng, đặt orders thành mảng rỗng
        setOrders([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchOrders();
  }, []);
  
  useEffect(() => {
    // Nếu có đơn hàng mới được tạo, cập nhật searchOrderId 
    if (createdOrder) {
      setSearchOrderId(createdOrder.order_id.toString());
    }
  }, [createdOrder]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Không hiển thị số lẻ sau dấu phẩy (vd: 1.000.000₫ thay vì 1.000.000,00₫)
    }).format(amount);
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
  
  const getStatusText = (status) => {
    switch (status) {
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      default:
        return status; // Hiển thị trạng thái gốc nếu không khớp
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchOrderId.toLowerCase();
    return (
      !searchOrderId ||
      order.order_id.toString().includes(search) ||
      (order.full_name && order.full_name.toLowerCase().includes(search)) ||
      (order.user_email && order.user_email.toLowerCase().includes(search))
    );
  });

  

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Quản lý đơn hàng đã đặt</h1>
      {/* <div className="mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm theo tên, email,hoặc ID..."
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
          className="max-w-sm"
        />
      </div> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Tổng đơn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead>Ngày tạo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((orders) => (
              <TableRow key={orders.order_id}>
                <TableCell className="font-medium">{orders.order_code}</TableCell>
                <TableCell>{formatCurrency(orders.total)}</TableCell>
                <TableCell>{orders.status}</TableCell>
                <TableCell>{orders.payment_method}</TableCell>
                <TableCell>{formatDate(orders.order_date)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={11}
                className="py-4 text-center text-muted-foreground"
              >
                Bạn cần đăng nhập hoặc không tìm thấy đơn hàng cho tài khoản này.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}