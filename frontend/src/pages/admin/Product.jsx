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
  Trash2,
  Search,
  Package,
  Plus,
  Edit,
  ShoppingCart,
  DollarSign,
  Archive,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

//Mock data for demonstration
// const mockProducts = [
//   {
//     id: "1",
//     name: "iPhone 15 Pro Max",
//     price: 29990000,
//     description: "Điện thoại thông minh cao cấp với chip A17 Pro",
//     category: "Điện thoại",
//     image: "/placeholder.svg?height=100&width=100",
//     type: "Electronics",
//     soluong: 25,
//     createdAt: "2024-01-15",
//   },
//   {
//     id: "2",
//     name: "Samsung Galaxy S24 Ultra",
//     price: 26990000,
//     description: "Flagship Android với S Pen tích hợp",
//     category: "Điện thoại",
//     image: "/placeholder.svg?height=100&width=100",
//     type: "Electronics",
//     soluong: 18,
//     createdAt: "2024-01-20",
//   },
//   {
//     id: "3",
//     name: "MacBook Pro M3",
//     price: 45990000,
//     description: "Laptop chuyên nghiệp với chip M3 mạnh mẽ",
//     category: "Laptop",
//     image: "/placeholder.svg?height=100&width=100",
//     type: "Electronics",
//     soluong: 12,
//     createdAt: "2024-02-01",
//   },
//   {
//     id: "4",
//     name: "AirPods Pro 2",
//     price: 6490000,
//     description: "Tai nghe không dây với chống ồn chủ động",
//     category: "Phụ kiện",
//     image: "/placeholder.svg?height=100&width=100",
//     type: "Electronics",
//     soluong: 45,
//     createdAt: "2024-02-05",
//   },
//   {
//     id: "5",
//     name: "iPad Air M2",
//     price: 16990000,
//     description: "Máy tính bảng đa năng cho công việc và giải trí",
//     category: "Tablet",
//     image: "/placeholder.svg?height=100&width=100",
//     type: "Electronics",
//     soluong: 8,
//     createdAt: "2024-02-10",
//   },
// ]

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    type: "",
    soluong: 0,
  });
  const [category, setCategory] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/admin/products");
      if (response.data && response.data.data) {
        const fetchProducts = response.data.data.map((p) => ({
          ...p,
          id: p.product_id,
          name: p.product_name,
          category:
            p.category && p.category.category_name
              ? p.category.category_name
              : "N/A",
        }));

        setProducts(fetchProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Không thể tải danh sách sản phẩm.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      if (response.data && response.data.data) {
        setCategory(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Không thể tải danh sách sản phẩm.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      type: "",
      soluong: 0,
    });
    setIsEditMode(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/admin/products/${id}`);
      toast.success("Xóa sản phẩm thành công!");
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Xóa sản phẩm thất bại.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + (product.price || 0) * (product.soluong || 0),
    0
  );
  const lowStockProducts = products.filter(
    (product) => product.soluong < 10
  ).length;
  const categories = [...new Set(products.map((product) => product.category))];

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price) {
      toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
    }

    if (isEditMode) {
      // Cập nhật sản phẩm
      setProducts((prev) =>
        prev.map((p) => (p.id === formData.id ? { ...formData } : p))
      );
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      // Thêm sản phẩm mới
      setProducts((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]);
      toast.success("Thêm sản phẩm thành công!");
    }

    setIsDialogOpen(false);
    resetForm();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý kho hàng và thông tin sản phẩm
          </p>
        </div>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus variant="outline" className="h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Chỉnh sửa thông tin sản phẩm"
                  : "Nhập thông tin sản phẩm mới"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên sản phẩm</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soluong">Số lượng</Label>
                  <Input
                    id="soluong"
                    name="soluong"
                    type="number"
                    value={formData.soluong}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Loại sản phẩm</Label>
                <Input
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL hình ảnh</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  {isEditMode ? "Cập nhật" : "Thêm sản phẩm"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Sản phẩm trong kho</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá trị kho</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalValue.toLocaleString("vi-VN")} đ
            </div>
            <p className="text-xs text-muted-foreground">
              Tổng giá trị hàng tồn
            </p>
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
            <Archive className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {lowStockProducts}
            </div>
            <p className="text-xs text-muted-foreground">
              Sản phẩm {"< 10"} cái
            </p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {categories.length}
            </div>
            <p className="text-xs text-muted-foreground">Loại sản phẩm</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>
            Tìm kiếm và quản lý sản phẩm trong kho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="w-[180px] border rounded px-2 py-1"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm || categoryFilter !== "all"
                            ? "Không tìm thấy sản phẩm phù hợp"
                            : "Chưa có sản phẩm nào"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.product_name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.product_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {category.find(
                            (item) =>
                              item.category_id === product.category_id
                          )?.category_name || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {(product.price || 0).toLocaleString("vi-VN")} đ
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={"default"}
                          className={
                            "bg-green-100 text-green-800 hover:bg-green-200"
                          }
                        >
                          Còn hàng
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product.createdAt
                          ? new Date(product.createdAt).toLocaleDateString(
                              "vi-VN"
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            title="Chỉnh sửa sản phẩm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="h-4 w-4 text-black" />
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
    </div>
  );
}
