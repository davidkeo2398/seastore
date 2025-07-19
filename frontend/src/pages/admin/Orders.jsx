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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Trash2,
  Search,
  ShoppingCart,
  DollarSign,
  Package,
  Clock,
  Eye,
  Edit,
  Calendar,
  User,
  MapPin,
  Plus,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

// ham tính tổng doanh thu
function calculateTotalRevenue(orders) {
  return orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + (Number(order.total) || 0), 0);
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/admin/order");
      setOrders(response.data.data || []);
    } catch (error) {
      setOrders([]);
      toast.error("Lấy danh sách đơn hàng thất bại!");
      console.error("Get orders fail: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (order_id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      return;
    }

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.order_id !== order_id)
    );
    toast.success("Xóa đơn hàng thành công!");
  };

  // const handleStatusChange = (order_id, newStatus) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.order_id === order_id ? { ...order, status: newStatus } : order
  //     )
  //   );
  //   toast.success("Cập nhật trạng thái đơn hàng thành công!");
  // };

  // Cập nhật trạng thái đơn hàng
  const handleStatusChange = async (order_id, newStatus) => {
    try {
      await axiosInstance.patch(`/admin/order/${order_id}`, {
        status: newStatus,
      });

      // cập nhật trạng thái nếu khớp cập nhật trạng thái đơn hàng
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === order_id ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Cập nhật trạng thái đơn hàng thành công");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại");
      console.error("Update status fail:", error);
    }
  };
  const handleViewDetails = (order) => {
    console.log("Selected order:", order);
    setSelectedOrder(order); // lưu đơn hàng đã chọn
    // mở dialog chi tiết đơn hàng
    setIsDetailDialogOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_code?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    // const matchesPayment =
    //   paymentFilter === "all" || order.payment_status === paymentFilter;

    return matchesSearch && matchesStatus;
  });

  // tổng số lượng đơn hàng
  const totalOrders = orders.length;
  // tổng doanh thu khi hoàn thành
  const totalRevenue = calculateTotalRevenue(orders);
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return (
          <Badge className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200">
            Đang xử lý
          </Badge>
        );
      case "completed":
        return (
          <Badge className="text-green-800 bg-green-100 hover:bg-green-200">
            Hoàn thành
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // const getPaymentBadge = (status) => {
  //   switch (status) {
  //     case "completed":
  //       return (
  //         <Badge className="text-green-800 bg-green-100 hover:bg-green-200">
  //           Đã thanh toán
  //         </Badge>
  //       );
  //     case "pending":
  //       return (
  //         <Badge className="text-orange-800 bg-orange-100 hover:bg-orange-200">
  //           Chờ thanh toán
  //         </Badge>
  //       );
  //     case "failed":
  //       return <Badge variant="destructive">Thất bại</Badge>;
  //     case "cancelled":
  //       return (
  //         <Badge className="text-gray-800 bg-gray-100 hover:bg-gray-200">
  //           Đã hoàn tiền
  //         </Badge>
  //       );
  //     default:
  //       return <Badge variant="outline">{status}</Badge>;
  //   }
  // };

  // Tính tổng tiền theo user

  // tổng tiền theo user

  // Tính tổng tiền theo user dựa trên các đơn hàng
  const userTotals = {};
  orders.forEach((order) => {
    if (!order.user_id) return;
    if (!userTotals[order.user_id]) {
      userTotals[order.user_id] = {
        user_name: order.user_name,
        user_email: order.user_email,
        total: 0,
      };
    }
    // Cộng dồn tổng tiền cho user
    userTotals[order.user_id].total += Number(order.total) || 0;
    console.log("userTotals", userTotals);
  });

  // Tìm user có tổng tiền lớn nhất
  const topBuyer = Object.values(userTotals).reduce(
    (max, user) => (user.total > (max?.total || 0) ? user : max),
    null
  );
  console.log("topBuyer", topBuyer);

  return (
    <div className="container px-4 py-8 mx-auto space-y-6">
      {/* Top Buyer */}
      {topBuyer && (
        <Card className="mb-4 border-2 border-yellow-400">
          <CardHeader>
            <CardTitle>Người mua hàng cao nhất</CardTitle>
            <CardDescription>
              {topBuyer.user_name || "N/A"} ({topBuyer.user_email || "N/A"})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg">
              Tổng tiền:{" "}
              <span className="font-bold text-green-600">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(topBuyer.total)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Tất cả đơn hàng</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalRevenue.toLocaleString("vi-VN")} đ
              {console.log("Lỗi tổng doanh thu:", totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">Đã thanh toán</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <Clock className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {pendingOrders}
            </div>
            <p className="text-xs text-muted-foreground">Đơn hàng mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <Package className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {completedOrders}
            </div>
            <p className="text-xs text-muted-foreground">Đã giao hàng</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>
            Tìm kiếm và quản lý đơn hàng của khách hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên, email hoặc mã đơn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Đang xử lý</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            {/* <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc thanh toán" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thanh toán</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
                <SelectItem value="pending">Chờ thanh toán</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
                <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  {/* <TableHead>Thanh toán</TableHead> */}
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm ||
                          statusFilter !== "all" ||
                          paymentFilter !== "all"
                            ? "Không tìm thấy đơn hàng phù hợp"
                            : "Chưa có đơn hàng nào"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell>
                        <code className="px-2 py-1 text-sm rounded bg-muted">
                          {order.order_code}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {new Date(order.order_date).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">
                            {order.user_name || "N/A"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.user_email || "N/A"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="flex items-start gap-1">
                          <MapPin className="flex-shrink-0 w-3 h-3 mt-1 text-muted-foreground" />
                          <div className="text-sm">
                            <div
                              className="truncate"
                              title={order.address_agency}
                            >
                              {order.address_agency}
                            </div>
                            <div className="text-muted-foreground">
                              {" "}
                              {order.country || "Việt Nam"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.total)}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) =>
                            handleStatusChange(order.order_id, value)
                          }
                        >
                          <SelectTrigger className="w-[130px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Đang xử lý</SelectItem>
                            <SelectItem value="completed">
                              Hoàn thành
                            </SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      {/* <TableCell>{getPaymentBadge(order.status)}</TableCell> */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(order)}
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {/* <Button variant="outline" size="sm" title="Chỉnh sửa">
                            <Edit className="w-4 h-4" />
                          </Button> */}
                          {/* <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(order.order_id)}
                            title="Xóa đơn hàng"
                          >
                            <Trash2 className="w-4 h-4 text-black" />
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đơn hàng {selectedOrder?.order_id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder ? (
            (console.log("Selected order:", selectedOrder),
            (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Thông tin khách hàng</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {selectedOrder.user_name || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Số điện thoại: </span>
                        {selectedOrder.phone_user ||
                          selectedOrder.phone_agency ||
                          "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Thông tin đơn hàng</h4>
                    <div className="space-y-1 text-sm">
                      <div>Mã: {selectedOrder.order_id}</div>
                      <div>
                        Ngày:{" "}
                        {new Date(selectedOrder.order_date).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                      {/* <div>
                      Phương thức giao hàng: {selectedOrder.shipping_method}
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Địa chỉ giao hàng</h4>
                  <div className="space-y-1 text-sm">
                    <div>{selectedOrder.address_agency}</div>
                    <div>
                      {/* {selectedOrder.city || "N/A"},{" "} */}
                      {selectedOrder.country || "Việt Nam"}{" "}
                      {selectedOrder.zipCode || ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      Trạng thái đơn hàng
                    </div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="text-sm text-muted-foreground">
                      Tổng tiền
                    </div>
                    <div className="text-2xl font-bold">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(selectedOrder.total)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p> Không có thông tin chi tiết đơn hàng nào được chọn.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
