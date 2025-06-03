
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
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
} from "lucide-react"

// Mock data for demonstration
const mockOrders = [
  {
    order_id: "ORD001",
    order_date: "2024-03-01",
    name: "Nguyễn Văn An",
    email: "nguyenvanan@example.com",
    address: "123 Đường Lê Lợi, Quận 1",
    city: "TP.HCM",
    country: "Việt Nam",
    zipCode: "70000",
    total: 2999000,
    iduser: "USER001",
    status: "completed",
    payment_status: "paid",
    shipping_method: "express",
    items_count: 3,
  },
  {
    order_id: "ORD002",
    order_date: "2024-03-02",
    name: "Trần Thị Bình",
    email: "tranthibinh@example.com",
    address: "456 Đường Nguyễn Huệ, Quận 3",
    city: "TP.HCM",
    country: "Việt Nam",
    zipCode: "70000",
    total: 1599000,
    iduser: "USER002",
    status: "processing",
    payment_status: "paid",
    shipping_method: "standard",
    items_count: 2,
  },
  {
    order_id: "ORD003",
    order_date: "2024-03-03",
    name: "Lê Văn Cường",
    email: "levancuong@example.com",
    address: "789 Đường Võ Văn Tần, Quận 5",
    city: "TP.HCM",
    country: "Việt Nam",
    zipCode: "70000",
    total: 4599000,
    iduser: "USER003",
    status: "pending",
    payment_status: "pending",
    shipping_method: "express",
    items_count: 1,
  },
  {
    order_id: "ORD004",
    order_date: "2024-03-04",
    name: "Phạm Thị Dung",
    email: "phamthidung@example.com",
    address: "321 Đường Điện Biên Phủ, Quận 10",
    city: "TP.HCM",
    country: "Việt Nam",
    zipCode: "70000",
    total: 649000,
    iduser: "USER004",
    status: "shipped",
    payment_status: "paid",
    shipping_method: "standard",
    items_count: 4,
  },
  {
    order_id: "ORD005",
    order_date: "2024-03-05",
    name: "Hoàng Văn Em",
    email: "hoangvanem@example.com",
    address: "654 Đường Cách Mạng Tháng 8, Quận Tân Bình",
    city: "TP.HCM",
    country: "Việt Nam",
    zipCode: "70000",
    total: 1699000,
    iduser: "USER005",
    status: "cancelled",
    payment_status: "refunded",
    shipping_method: "express",
    items_count: 2,
  },
]



export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const handleDelete = (order_id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      return
    }

    setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== order_id))
    toast.success("Xóa đơn hàng thành công!")
  }

  const handleStatusChange = (order_id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.order_id === order_id ? { ...order, status: newStatus } : order)),
    )
    toast.success("Cập nhật trạng thái đơn hàng thành công!")
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPayment = paymentFilter === "all" || order.payment_status === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const totalOrders = orders.length
  const totalRevenue = orders
    .filter((order) => order.payment_status === "paid")
    .reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const completedOrders = orders.filter((order) => order.status === "completed").length

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Chờ xử lý</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Đang xử lý</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Đã gửi</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Hoàn thành</Badge>
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Đã thanh toán</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Chờ thanh toán</Badge>
      case "failed":
        return <Badge variant="destructive">Thất bại</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Đã hoàn tiền</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
          <p className="text-muted-foreground mt-1">Theo dõi và xử lý đơn hàng của khách hàng</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo đơn hàng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Tất cả đơn hàng</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString("vi-VN")} đ</div>
            <p className="text-xs text-muted-foreground">Đã thanh toán</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Đơn hàng mới</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">Đã giao hàng</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>Tìm kiếm và quản lý đơn hàng của khách hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="shipped">Đã gửi</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
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
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm || statusFilter !== "all" || paymentFilter !== "all"
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
                        <code className="bg-muted px-2 py-1 rounded text-sm">{order.order_id}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(order.order_date).toLocaleDateString("vi-VN")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{order.name}</div>
                          <div className="text-sm text-muted-foreground">{order.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="flex items-start gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="truncate" title={order.address}>
                              {order.address}
                            </div>
                            <div className="text-muted-foreground">
                              {order.city}, {order.country}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3 text-muted-foreground" />
                          {order.items_count} sản phẩm
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{order.total.toLocaleString("vi-VN")} đ</TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.order_id, value)}
                        >
                          <SelectTrigger className="w-[130px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Chờ xử lý</SelectItem>
                            <SelectItem value="processing">Đang xử lý</SelectItem>
                            <SelectItem value="shipped">Đã gửi</SelectItem>
                            <SelectItem value="completed">Hoàn thành</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{getPaymentBadge(order.payment_status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(order)}
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Chỉnh sửa">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(order.order_id)}
                            title="Xóa đơn hàng"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
            <DialogDescription>Thông tin chi tiết về đơn hàng {selectedOrder?.order_id}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Thông tin khách hàng</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      {selectedOrder.name}
                    </div>
                    <div>{selectedOrder.email}</div>
                    <div>ID: {selectedOrder.iduser}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Thông tin đơn hàng</h4>
                  <div className="space-y-1 text-sm">
                    <div>Mã: {selectedOrder.order_id}</div>
                    <div>Ngày: {new Date(selectedOrder.order_date).toLocaleDateString("vi-VN")}</div>
                    <div>Phương thức giao hàng: {selectedOrder.shipping_method}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Địa chỉ giao hàng</h4>
                <div className="text-sm space-y-1">
                  <div>{selectedOrder.address}</div>
                  <div>
                    {selectedOrder.city}, {selectedOrder.country} {selectedOrder.zipCode}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Trạng thái đơn hàng</div>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-sm text-muted-foreground">Tổng tiền</div>
                  <div className="text-2xl font-bold">{selectedOrder.total.toLocaleString("vi-VN")} đ</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
