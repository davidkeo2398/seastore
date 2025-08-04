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
  Search,
  ShoppingCart,
  DollarSign,
  Package,
  Clock,
  Eye,
  Calendar,
  User,
  MapPin,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

// Hàm tính tổng doanh thu của các đơn hàng đã hoàn thành
function calculateTotalRevenue(orders) {
  return orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + (Number(order.total) || 0), 0);
}

// Định nghĩa thứ tự và các bước chuyển của trạng thái
const statusFlow = {
  pending: { level: 1, next: ["paid", "delivering"], canCancel: true },
  paid: { level: 2, next: ["delivering"], canCancel: true },
  delivering: { level: 3, next: ["completed"], canCancel: true },
  completed: { level: 4, next: [], canCancel: false },
  cancelled: { level: 5, next: [], canCancel: false },
};

const predefinedPriceRanges = [
  { label: "Tất cả", min: 0, max: Number.MAX_SAFE_INTEGER },
  { label: "1 - 5 triệu", min: 1000000, max: 5000000 },
  { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
  { label: "Trên 10 triệu", min: 10000000, max: Number.MAX_SAFE_INTEGER },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: Number.MAX_SAFE_INTEGER, // Giá tối đa là vô hạn
  });

  // const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  // const itemsPerPage = 7; // Số sản phẩm trên mỗi trang

  // l: khởi tạo khoảng giá mặc định -> lọc qua filter hàm kiểm tra giá -> hàm const handChange

  const sortedOrders = orders.sort((a, b) => {
    return new Date(b.order_date) - new Date(a.order_date);
  });

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/admin/order");
      // Sắp xếp đơn hàng theo ngày đặt mới nhất
      const sortedOrders = (response.data.data || []).sort((a, b) => {
        return new Date(b.order_date) - new Date(a.order_date);
      });
      // Chỉ cần gọi setOrders một lần với dữ liệu đã sắp xếp
      setOrders(sortedOrders);
    } catch (error) {
      setOrders([]);
      toast.error("Lấy danh sách đơn hàng thất bại!");
      console.error("Get orders fail: ", error);
    }
  };

  const fetchOrderDetails = async (order_id) => {
    setOrderItems([]); // Xóa dữ liệu cũ trước khi tải mới
    try {
      const response = await axiosInstance.get(`/admin/order/${order_id}`);
      console.log("Admin order details response:", response.data);

      setSelectedOrder(response.data);
      setOrderItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching admin order details:", error);
      setOrderItems([]);
      toast.error("Không thể lấy chi tiết đơn hàng!");
    }
  };

  // Tải danh sách đơn hàng khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Tải chi tiết đơn hàng khi một đơn hàng được chọn
  // useEffect(() => {
  //   if (selectedOrder) {
  //     fetchOrderDetails(selectedOrder.order_id);
  //   }
  // }, []);

  // Hàm xử lý thay đổi trạng thái đơn hàng
  const handleStatusChange = async (order_id, newStatus, order) => {
    console.log("change status", order);
    const currentOrder = orders.find((order) => order.order_id === order_id);
    if (!currentOrder) {
      toast.error("Không tìm thấy đơn hàng!");
      return;
    }

    const currentStatusInfo = statusFlow[currentOrder.status];
    const isAllowedTransition = currentStatusInfo.next.includes(newStatus);
    const isCancelled = newStatus === "cancelled";

    if (!isAllowedTransition && !(isCancelled && currentStatusInfo.canCancel)) {
      toast.error(
        `Không thể thay đổi trạng thái từ "${currentOrder.status}" thành "${newStatus}".`
      );
      return;
    }

    const originalOrders = [...orders];
    const updatedOrders = orders.map((order) =>
      order.order_id === order_id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    try {
      await axiosInstance.patch(`/admin/order/${order_id}`, {
        status: newStatus,
        user_id: order.user_id,
      });
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      toast.error("Cập nhật trạng thái thất bại!");
      console.error("Update status fail:", error);
      setOrders(originalOrders);
    }
  };

  const handleViewDetails = (order, order_id) => {
    console.log("Viewing details for order:", order_id);
    fetchOrderDetails(order_id);
    // setSelectedOrder(order);
    setIsDetailDialogOpen(true);
    console.log("product", orderItems);
  };

  const filteredOrders = orders.filter((order) => {
    const searchTermLower = searchTerm.toLowerCase();

    const matchesSearch =
      order.user_name?.toLowerCase().includes(searchTermLower) ||
      order.user_email?.toLowerCase().includes(searchTermLower) ||
      order.order_code?.toLowerCase().includes(searchTermLower) ||
      order.phone_user?.toLowerCase().includes(searchTermLower) ||
      order.phone_agency?.toLowerCase().includes(searchTermLower);
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchePrice =
      order.total >= priceRange.min && order.total <= priceRange.max;

    return matchesSearch && matchesStatus && matchePrice;
  });

  const formatCurrency = (value) => {
    if (value === Infinity) return ""; // Nếu là Infinity, trả về chuỗi rỗng
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // //dưới filter
  // const totalPages = Math.ceil(filteredOrders.length / itemsPerPage); // Tổng số trang
  // const paginatedOrders = filteredOrders.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // ); // Đơn hàng hiển thị trên trang hiện tại

  //  const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };

  const totalOrders = orders.length;
  const totalRevenue = calculateTotalRevenue(orders);
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  // số đơn hàng đã hoàn thành
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;

  // tạo bộ lọc theo tổng chi tiêu

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200">
            Đang xử lý
          </Badge>
        );
      case "paid":
        return (
          <Badge className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200">
            Đã thanh toán
          </Badge>
        );
      case "delivering":
        return (
          <Badge className="text-blue-800 bg-blue-100 hover:bg-blue-200">
            Đang vận chuyển
          </Badge>
        );
      case "completed":
        return (
          <Badge className="text-green-800 bg-green-100 hover:bg-green-200">
            Hoàn thành
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // tổng từng khách chi tiêu dưa trên đơn hàng
  const userTotals = orders.reduce((acc, order) => {
    if (!order.user_id) return acc;
    if (!acc[order.user_id]) {
      acc[order.user_id] = {
        user_name: order.user_name,
        user_email: order.user_email,
        total: 0,
      };
    }
    acc[order.user_id].total += Number(order.total) || 0;
    return acc;
  }, {});

  // Tìm người dùng có tổng chi tiêu cao nhất
  const topBuyer = Object.values(userTotals).reduce(
    (max, user) => (user.total > (max?.total || 0) ? user : max),
    null
  );

  // tìm khách hàng có tổng chi tiêu trên 1 triệu
  const topBuyerAbove1M = Object.values(userTotals).filter(
    (user) => user.total > 1000000
  );

  // // Hàm xử lý thay đổi khoảng giá
  // const handlePriceChange = (e) => {
  //   const { name, value } = e.target; // name là 'min' hoặc 'max'
  //   setPriceRange((prev) => ({
  //     ...prev,
  //     [name]:
  //       value === ""
  //         ? name === "max"
  //           ? Number.MAX_SAFE_INTEGER // Nếu ô input rỗng, trả về giá trị vô hạn
  //           : 0
  //         : Number(value.replace(/\D/g, "")), // Loại bỏ ký tự không phải số
  //   }));
  // };

  // Hàm xử lý thay đổi khoảng giá từ combobox
  const handlePredefinedPriceRangeChange = (value) => {
    const selectedRange = predefinedPriceRanges.find(
      (range) => range.label === value
    );
    if (selectedRange) {
      setPriceRange({ min: selectedRange.min, max: selectedRange.max });
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto space-y-6">
      {topBuyer && (
        <Card className="mb-4 border-2 border-yellow-400">
          <CardHeader>
            <CardTitle>Khách hàng chi tiêu nhiều nhất</CardTitle>
            <CardDescription>
              {topBuyer.user_name || "N/A"} ({topBuyer.user_email || "N/A"})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg">
              Tổng chi tiêu:{" "}
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

      {/* <div className="container px-4 py-8 mx-auto space-y-6">
        {topBuyerAbove1M.length > 0 && (
          <Card className="mb-4 border-2 border-yellow-400">
            <CardHeader>
              <CardTitle>Khách hàng chi tiêu trên 1 triệu</CardTitle>
              <CardDescription>
                {topBuyerAbove1M.map((user) => (
                  <div key={user.user_id}>
                    {user.user_name || "N/A"} ({user.user_email || "N/A"})
                  </div>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-lg">
                Tổng chi tiêu:{" "}
                <span className="font-bold text-green-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(topBuyer.total)}
                </span>
              </div>
            </CardContent>
          </Card>
        )} */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Card stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
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
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
            <Clock className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {pendingOrders}
            </div>
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
          </CardContent>
        </Card>
      </div>

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
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Đang xử lý</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
                <SelectItem value="delivering">Đang vận chuyển</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>

            {/* Thêm bộ lọc khoảng giá */}
            {/* <div className="flex-1">
              <div className="flex items-center justify-end gap-4 mb-6">
                <Select onValueChange={handlePredefinedPriceRangeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Lọc theo khoảng giá" />
                  </SelectTrigger>
                  <SelectContent>
                    {predefinedPriceRanges.map((range) => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
          </div> */}


          </div>

          {/* Existing price range inputs
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="text"
                  name="min"
                  placeholder="Giá tối thiểu"
                  value={priceRange.min === 0 ? "" : priceRange.min}
                  onChange={handlePriceChange}
                  className="w-full"
                />
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="flex-1">
                <Input
                  type="text"
                  name="max"
                  placeholder="Giá tối đa"
                  value={priceRange.max === Number.MAX_SAFE_INTEGER ? "" : priceRange.max}
                  onChange={handlePriceChange}
                  className="w-full"
                />
              </div>
            </div> */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Phương thức thanh toán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {paginatedOrders.length === 0 ? (  */}
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Không có đơn hàng nào.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const isFinalStatus =
                      order.status === "completed" ||
                      order.status === "cancelled";
                    return (
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
                          <div className="font-medium">
                            {order.user_name || "N/A"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.user_email || "N/A"}
                          </div>
                        </TableCell>
                        <TableCell
                          className="max-w-[200px] truncate"
                          title={order.address_agency}
                        >
                          {order.address_agency}
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.total)}
                        </TableCell>
                        <TableCell>{order.payment_method}</TableCell>
                        <TableCell>
                          {isFinalStatus ? (
                            getStatusBadge(order.status)
                          ) : (
                            <Select
                              value={order.status}
                              onValueChange={(value) =>
                                handleStatusChange(order.order_id, value, order)
                              }
                            >
                              <SelectTrigger className="w-[150px] h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value="pending"
                                  disabled={order.status !== "pending"}
                                >
                                  Đang xử lý
                                </SelectItem>

                                <SelectItem
                                  value="paid"
                                  disabled={order.status !== "pending"}
                                >
                                  Đã thanh toán
                                </SelectItem>
                                <SelectItem
                                  value="delivering"
                                  disabled={
                                    !statusFlow[order.status].next.includes(
                                      "delivering"
                                    )
                                  }
                                >
                                  Đang vận chuyển
                                </SelectItem>
                                <SelectItem
                                  value="completed"
                                  disabled={
                                    !statusFlow[order.status].next.includes(
                                      "completed"
                                    )
                                  }
                                >
                                  Hoàn thành
                                </SelectItem>
                                <SelectItem
                                  value="cancelled"
                                  disabled={!statusFlow[order.status].canCancel}
                                >
                                  Đã hủy
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleViewDetails(order, order.order_id)
                            }
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* <div className="flex justify-end mt-4 space-x-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Pre
        </Button>
        <span className="px-4 py-2 border rounded">
          Trang {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div> */}

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đơn hàng {selectedOrder?.order_code}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder ? (
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
                      <span className="font-medium">SĐT: </span>
                      {selectedOrder.phone_user ||
                        selectedOrder.phone_agency ||
                        "N/A"}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Thông tin đơn hàng</h4>
                  <div className="space-y-1 text-sm">
                    <div>Mã: {selectedOrder.order_code}</div>
                    <div>
                      Ngày:{" "}
                      {new Date(selectedOrder.order_date).toLocaleDateString(
                        "vi-VN"
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Địa chỉ giao hàng</h4>
                <div className="text-sm">{selectedOrder.address_agency}</div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Sản phẩm</h4>
                <ul className="space-y-2 overflow-y-auto text-sm max-h-60">
                  {orderItems.length > 0 ? (
                    orderItems.map((item) => (
                      <li
                        key={item.order_item_id}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.product?.image || "/placeholder.png"}
                          alt={item.product?.product_name || "Sản phẩm"}
                          className="object-cover w-16 h-16 rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.product?.product_name || "N/A"}
                          </p>
                          <p className="text-muted-foreground">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          {item.product?.price
                            ? new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.product.price * item.quantity)
                            : "N/A"}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Đang tải...</p>
                  )}
                </ul>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Trạng thái
                  </div>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-sm text-muted-foreground">Tổng tiền</div>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedOrder.total)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Đang tải thông tin đơn hàng...</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
    // </div>
  );
}
