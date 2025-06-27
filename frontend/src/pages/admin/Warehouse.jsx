import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Package,
  Plus,
  Search,
  WarehouseIcon,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  MapPin,
  Calendar,
  BarChart3,
  ArrowUpDown,
  Eye,
  Edit,
} from "lucide-react";

// Mock data for warehouse locations
// const mockWarehouses = [
//   {
//     id: "WH001",
//     name: "Kho Trung tâm TP.HCM",
//     address: "123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM",
//     manager: "Nguyễn Văn An",
//     capacity: 10000,
//     currentStock: 7500,
//     status: "active",
//   },
//   {
//     id: "WH002",
//     name: "Kho Hà Nội",
//     address: "456 Đường Giải Phóng, Hai Bà Trưng, Hà Nội",
//     manager: "Trần Thị Bình",
//     capacity: 8000,
//     currentStock: 6200,
//     status: "active",
//   },
//   {
//     id: "WH003",
//     name: "Kho Đà Nẵng",
//     address: "789 Đường Lê Duẩn, Hải Châu, Đà Nẵng",
//     manager: "Lê Văn Cường",
//     capacity: 5000,
//     currentStock: 3800,
//     status: "maintenance",
//   },
// ]

// const mockInventory = [
//   {
//     id: "INV001",
//     productName: "iPhone 15 Pro Max",
//     sku: "IP15PM-256-BLU",
//     warehouseId: "WH001",
//     warehouseName: "Kho Trung tâm TP.HCM",
//     quantity: 45,
//     lastUpdated: "2024-03-01",
//     expiryDate: "2025-12-31",
//   },
//   {
//     id: "INV002",
//     productName: "Samsung Galaxy S24 Ultra",
//     sku: "SGS24U-512-BLK",
//     warehouseId: "WH001",
//     warehouseName: "Kho Trung tâm TP.HCM",
//     quantity: 8,
//     lastUpdated: "2024-02-28",
//     expiryDate: "2026-06-30",
//   },
//   {
//     id: "INV003",
//     productName: "MacBook Pro M3",
//     sku: "MBP-M3-16-SLV",
//     warehouseId: "WH002",
//     warehouseName: "Kho Hà Nội",
//     quantity: 0,
//     lastUpdated: "2024-02-25",
//     expiryDate: "2025-11-20",
//   },
//   {
//     id: "INV004",
//     productName: "AirPods Pro 2",
//     sku: "APP2-WHT",
//     warehouseId: "WH002",
//     warehouseName: "Kho Hà Nội",
//     quantity: 120,
//     lastUpdated: "2024-03-02",
//     expiryDate: "2026-01-15",
//   },
// ]

// Mock data for stock movements
// const mockMovements = [
//   {
//     id: "MOV001",
//     type: "inbound",
//     productName: "iPhone 15 Pro Max",
//     sku: "IP15PM-256-BLU",
//     quantity: 50,
//     warehouseId: "WH001",
//     warehouseName: "Kho Trung tâm TP.HCM",
//     reason: "Nhập hàng từ nhà cung cấp",
//     date: "2024-03-01",
//     operator: "Nguyễn Văn An",
//     status: "completed",
//   },
//   {
//     id: "MOV002",
//     type: "outbound",
//     productName: "Samsung Galaxy S24 Ultra",
//     sku: "SGS24U-512-BLK",
//     quantity: 25,
//     warehouseId: "WH001",
//     warehouseName: "Kho Trung tâm TP.HCM",
//     reason: "Xuất hàng cho đơn hàng #12345",
//     date: "2024-02-28",
//     operator: "Trần Thị Bình",
//     status: "completed",
//   },
//   {
//     id: "MOV003",
//     type: "transfer",
//     productName: "MacBook Pro M3",
//     sku: "MBP-M3-16-SLV",
//     quantity: 10,
//     warehouseId: "WH001",
//     warehouseName: "Kho Trung tâm TP.HCM",
//     reason: "Chuyển kho từ HCM sang Hà Nội",
//     date: "2024-02-27",
//     operator: "Lê Văn Cường",
//     status: "pending",
//   },
// ]

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [movements, setMovements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [isMovementDialogOpen, setIsMovementDialogOpen] = useState(false);
  const [movementForm, setMovementForm] = useState({
    type: "inbound",
    productName: "",
    sku: "",
    quantity: 0,
    warehouseId: "",
    reason: "",
  });
  

  useEffect(() => {
    getWarehouses()
      .then((res) => {
        // Nếu backend trả về data dạng { data: [...] }
        setWarehouses(res.data.data || []);
      })
      .catch((err) => {
        setWarehouses([]);
        // Có thể hiện toast lỗi nếu muốn
      });
  }, []);

  const handleCreateMovement = (e) => {
    e.preventDefault();
    const newMovement = {
      id: `MOV${Date.now()}`,
      ...movementForm,
      warehouseName:
        warehouses.find((w) => w.id === movementForm.warehouseId)?.name || "",
      date: new Date().toISOString().split("T")[0],
      operator: "Admin User",
      status: "pending",
      quantity: Number(movementForm.quantity),
    };
    setMovements((prev) => [newMovement, ...prev]);
    setIsMovementDialogOpen(false);
    setMovementForm({
      type: "inbound",
      productName: "",
      sku: "",
      quantity: 0,
      warehouseId: "",
      reason: "",
    });
    toast.success("Tạo phiếu xuất nhập kho thành công!");
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse =
      warehouseFilter === "all" || item.warehouseId === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  const totalCapacity = warehouses.reduce(
    (sum, wh) => sum + (wh.capacity || 0),
    0
  );
  const totalCurrentStock = warehouses.reduce(
    (sum, wh) => sum + (wh.currentStock || 0),
    0
  );

  const getMovementIcon = (type) => {
    switch (type) {
      case "inbound":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "outbound":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "transfer":
        return <ArrowUpDown className="h-4 w-4 text-blue-600" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý kho hàng</h1>
          <p className="text-muted-foreground mt-1">
            Theo dõi tồn kho và quản lý xuất nhập kho
          </p>
        </div>
        <Dialog
          open={isMovementDialogOpen}
          onOpenChange={setIsMovementDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Tạo phiếu xuất nhập
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tạo phiếu xuất nhập kho</DialogTitle>
              <DialogDescription>
                Tạo phiếu nhập hàng, xuất hàng hoặc chuyển kho
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateMovement} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Loại phiếu</Label>
                  <Select
                    value={movementForm.type}
                    onValueChange={(value) =>
                      setMovementForm({ ...movementForm, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inbound">Nhập hàng</SelectItem>
                      <SelectItem value="outbound">Xuất hàng</SelectItem>
                      <SelectItem value="transfer">Chuyển kho</SelectItem>
                      <SelectItem value="adjustment">Điều chỉnh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warehouseId">Kho hàng</Label>
                  <Select
                    value={movementForm.warehouseId}
                    onValueChange={(value) =>
                      setMovementForm({ ...movementForm, warehouseId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kho" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Tên sản phẩm</Label>
                  <Input
                    id="productName"
                    value={movementForm.productName}
                    onChange={(e) =>
                      setMovementForm({
                        ...movementForm,
                        productName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">Mã SKU</Label>
                  <Input
                    id="sku"
                    value={movementForm.sku}
                    onChange={(e) =>
                      setMovementForm({ ...movementForm, sku: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Số lượng</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={movementForm.quantity}
                  onChange={(e) =>
                    setMovementForm({
                      ...movementForm,
                      quantity: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Lý do</Label>
                <Textarea
                  id="reason"
                  value={movementForm.reason}
                  onChange={(e) =>
                    setMovementForm({ ...movementForm, reason: e.target.value })
                  }
                  placeholder="Nhập lý do xuất nhập kho..."
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsMovementDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">Tạo phiếu</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng kho hàng</CardTitle>
            <WarehouseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouses.length}</div>
            <p className="text-xs text-muted-foreground">Kho đang hoạt động</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ sử dụng</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((totalCurrentStock / totalCapacity) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {totalCurrentStock.toLocaleString()} /{" "}
              {totalCapacity.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Tồn kho</TabsTrigger>
          <TabsTrigger value="warehouses">Kho hàng</TabsTrigger>
          <TabsTrigger value="movements">Xuất nhập kho</TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý tồn kho</CardTitle>
              <CardDescription>
                Theo dõi số lượng và vị trí sản phẩm trong kho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm hoặc SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={warehouseFilter}
                  onValueChange={setWarehouseFilter}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Lọc theo kho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả kho</SelectItem>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Kho</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Hạn sử dụng</TableHead>
                      <TableHead>Cập nhật cuối</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.productName}
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {item.sku}
                          </code>
                        </TableCell>
                        <TableCell>{item.warehouseName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {new Date(item.expiryDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(item.lastUpdated).toLocaleDateString(
                            "vi-VN"
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              title="Chỉnh sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warehouses Tab */}
        <TabsContent value="warehouses">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách kho hàng</CardTitle>
              <CardDescription>
                Quản lý thông tin và trạng thái các kho hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã kho</TableHead>
                      <TableHead>Tên kho</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead>Quản lý</TableHead>
                      <TableHead>Sức chứa</TableHead>
                      <TableHead>Tỷ lệ sử dụng</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouses.map((warehouse) => (
                      <TableRow key={warehouse.id}>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {warehouse.id}
                          </code>
                        </TableCell>
                        <TableCell className="font-medium">
                          {warehouse.name}
                        </TableCell>
                        <TableCell
                          className="max-w-[300px] truncate"
                          title={warehouse.address}
                        >
                          {warehouse.address}
                        </TableCell>
                        <TableCell>{warehouse.manager}</TableCell>
                        <TableCell>
                          {warehouse.capacity.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${
                                    (warehouse.currentStock /
                                      warehouse.capacity) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {Math.round(
                                (warehouse.currentStock / warehouse.capacity) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              warehouse.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              warehouse.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : warehouse.status === "maintenance"
                                ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                : ""
                            }
                          >
                            {warehouse.status === "active"
                              ? "Hoạt động"
                              : warehouse.status === "maintenance"
                              ? "Bảo trì"
                              : "Không hoạt động"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              title="Chỉnh sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stock Movements Tab */}
        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử xuất nhập kho</CardTitle>
              <CardDescription>
                Theo dõi các giao dịch xuất nhập kho và chuyển hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loại</TableHead>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Kho</TableHead>
                      <TableHead>Lý do</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead>Người thực hiện</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getMovementIcon(movement.type)}
                            <span className="capitalize">
                              {movement.type === "inbound"
                                ? "Nhập"
                                : movement.type === "outbound"
                                ? "Xuất"
                                : movement.type === "transfer"
                                ? "Chuyển"
                                : "Điều chỉnh"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {movement.productName}
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            {movement.sku}
                          </code>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              movement.type === "inbound"
                                ? "text-green-600"
                                : movement.type === "outbound"
                                ? "text-red-600"
                                : ""
                            }
                          >
                            {movement.type === "inbound"
                              ? "+"
                              : movement.type === "outbound"
                              ? "-"
                              : ""}
                            {movement.quantity}
                          </span>
                        </TableCell>
                        <TableCell>{movement.warehouseName}</TableCell>
                        <TableCell
                          className="max-w-[200px] truncate"
                          title={movement.reason}
                        >
                          {movement.reason}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {new Date(movement.date).toLocaleDateString(
                              "vi-VN"
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{movement.operator}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              movement.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              movement.status === "completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : movement.status === "pending"
                                ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {movement.status === "completed"
                              ? "Hoàn thành"
                              : movement.status === "pending"
                              ? "Đang xử lý"
                              : "Đã hủy"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
