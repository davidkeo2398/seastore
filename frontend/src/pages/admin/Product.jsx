// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import {
//   Trash2,
//   Search,
//   Package,
//   Plus,
//   Edit,
//   ShoppingCart,
//   DollarSign,
//   Archive,
// } from "lucide-react";
// import axiosInstance from "@/lib/axios";

// //Mock data for demonstration
// // const mockProducts = [
// //   {
// //     id: "1",
// //     name: "iPhone 15 Pro Max",
// //     price: 29990000,
// //     description: "Điện thoại thông minh cao cấp với chip A17 Pro",
// //     category: "Điện thoại",
// //     image: "/placeholder.svg?height=100&width=100",
// //     type: "Electronics",
// //     soluong: 25,
// //     createdAt: "2024-01-15",
// //   },
// //   {
// //     id: "2",
// //     name: "Samsung Galaxy S24 Ultra",
// //     price: 26990000,
// //     description: "Flagship Android với S Pen tích hợp",
// //     category: "Điện thoại",
// //     image: "/placeholder.svg?height=100&width=100",
// //     type: "Electronics",
// //     soluong: 18,
// //     createdAt: "2024-01-20",
// //   },
// //   {
// //     id: "3",
// //     name: "MacBook Pro M3",
// //     price: 45990000,
// //     description: "Laptop chuyên nghiệp với chip M3 mạnh mẽ",
// //     category: "Laptop",
// //     image: "/placeholder.svg?height=100&width=100",
// //     type: "Electronics",
// //     soluong: 12,
// //     createdAt: "2024-02-01",
// //   },
// //   {
// //     id: "4",
// //     name: "AirPods Pro 2",
// //     price: 6490000,
// //     description: "Tai nghe không dây với chống ồn chủ động",
// //     category: "Phụ kiện",
// //     image: "/placeholder.svg?height=100&width=100",
// //     type: "Electronics",
// //     soluong: 45,
// //     createdAt: "2024-02-05",
// //   },
// //   {
// //     id: "5",
// //     name: "iPad Air M2",
// //     price: 16990000,
// //     description: "Máy tính bảng đa năng cho công việc và giải trí",
// //     category: "Tablet",
// //     image: "/placeholder.svg?height=100&width=100",
// //     type: "Electronics",
// //     soluong: 8,
// //     createdAt: "2024-02-10",
// //   },
// // ]

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [units, setUnits] = useState([
//     "kg",
//     "g",
//     "lit",
//     "Dang",
//     "cai",
//     "hop",
//     "chai",
//     "coc",
//     "thung",
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     product_name: "",
//     price: 0,
//     description: "",
//     old_price: "",
//     image: "",
//     category_id: "",
//     agency_id: "1",
//     warehouse_id: "",
//     unit: "",
//     number_of_inventory: 50,
//   });
//   const [category, setCategory] = useState([]);
//   const [agencies, setAgencies] = useState([]);
//   const [warehouses, setWarehouses] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/products");
//       if (response.data && response.data.data) {
//         const fetchProducts = response.data.data.map((p) => ({
//           ...p,
//           id: p.product_id,
//           name: p.product_name,
//           category:
//             p.category && p.category.category_name
//               ? p.category.category_name
//               : "N/A",
//         }));

//         setProducts(fetchProducts);
//       }
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       toast.error("Không thể tải danh sách sản phẩm.");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/category");
//       if (response.data && response.data.data) {
//         setCategory(response.data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//       toast.error("Không thể tải danh sách danh mục.");
//     }
//   };

//   const fetchAgencies = async () => {
//     try {
//       const res = await axiosInstance.get("/agency");
//       if (res.data && res.data.data) setAgencies(res.data.data);
//     } catch (error) {
//       toast.error("Không thể tải danh sách đại lý.");
//     }
//   };

//   // const fetchWarehouses = async () => {
//   //   try {
//   //     const res = await axiosInstance.get("/warehouse");
//   //     if (res.data && res.data.data) setWarehouses(res.data.data);
//   //   } catch (error) {
//   //     toast.error("Không thể tải danh sách kho.");
//   //   }
//   // };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//     fetchAgencies();
//     // fetchWarehouses();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Nếu muốn cho phép thêm mới vào danh sách frontend (không ảnh hưởng backend)
//     if (value && !units.includes(value)) {
//       setUnits((prev) => [...prev, value]);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       product_name: "",
//       price: 0,
//       description: "",
//       old_price: "",
//       image: "",
//       category_id: "",
//       agency_id: "1",
//       warehouse_id: "",
//       unit: "",
//       number_of_inventory: 50,
//     });
//     setIsEditMode(false);
//   };

//   const handleEdit = (product) => {
//     setFormData({
//       ...product,
//     unit: product.unit === "0" || product.unit === 0 ? "" : product.unit, // So sánh cả số 0 và chuỗi "0"
//     });
//     setIsEditMode(true);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
//       return;
//     }

//     try {
//       await axiosInstance.delete(`/admin/products/${id}`);
//       toast.success("Xóa sản phẩm thành công!");
//       fetchProducts();
//     } catch (error) {
//       console.error("Failed to delete product:", error);
//       toast.error("Xóa sản phẩm thất bại.");
//     }
//   };

//   const handleUnitChange = (e) => {
//     const value = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       unit: value,
//     }));
//     if (value && !units.includes(value)) {
//       setUnits((prev) => [...prev, value]);
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       (product.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (product.category || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       (product.description || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       categoryFilter === "all" ||
//       String(product.category_id) === String(categoryFilter);

//     return matchesSearch && matchesCategory;
//   });

//   const totalProducts = products.length;
//   const totalValue = products.reduce(
//     (sum, product) => sum + (product.price || 0) * (product.soluong || 0),
//     0
//   );
//   const lowStockProducts = products.filter(
//     (product) => product.soluong < 10
//   ).length;
//   const categories = [...new Set(products.map((product) => product.category))];

//   async function handleSubmit(e) {
//     e.preventDefault();
//     console.log("Submit form", formData);
//     if (
//       !formData.product_name ||
//       !formData.category_id ||
//       !formData.price ||
//       !formData.unit ||
//       formData.number_of_inventory === ""
//     ) {
//       toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
//       return;
//     }
//     if (isEditMode) {
//       // Cập nhật sản phẩm (nếu cần, có thể bổ sung API PUT ở đây)
//       setProducts((prev) =>
//         prev.map((p) => (p.id === formData.id ? { ...formData } : p))
//       );
//       const { data } = await axiosInstance.put(`/admin/products/${formData.id}`, formData);
//       fetchProducts();
//       toast.success("Cập nhật sản phẩm thành công!");
//     } else {
//       try {
//         const productData = {
//           product_name: formData.product_name,
//           price: Number(formData.price),
//           description: formData.description,
//           old_price: formData.old_price
//             ? Number(formData.old_price)
//             : undefined,
//           image: formData.image,
//           category_id: Number(formData.category_id),
//           agency_id: formData.agency_id ? Number(formData.agency_id) : 1,
//           warehouse_id: formData.warehouse_id
//             ? Number(formData.warehouse_id)
//             : null,
//           unit: formData.unit,
//           number_of_inventory: Number(formData.number_of_inventory),
//         };
//         await axiosInstance.post("/admin/products", productData);
//         toast.success("Thêm sản phẩm thành công!");
//         fetchProducts();
//       } catch (error) {
//         console.error("Lỗi khi thêm sản phẩm:", error);
//         alert("Lỗi khi thêm sản phẩm: " + error.message);
//         toast.error("Thêm sản phẩm thất bại!");
//         return;
//       }
//     }
//     setIsDialogOpen(false);
//     resetForm();
//   }

//   return (
//     <div className="container px-4 py-8 mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
//           <p className="mt-1 text-muted-foreground">
//             Quản lý kho hàng và thông tin sản phẩm
//           </p>
//         </div>
//         <Dialog
//           open={isDialogOpen}
//           onOpenChange={(open) => {
//             setIsDialogOpen(open);
//             if (!open) resetForm();
//           }}
//         >
//           <DialogTrigger asChild>
//             <Button className="gap-2 text-black">
//               <Plus variant="outline" className="w-4 h-4 text-black" />
//               Thêm sản phẩm
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>
//                 {isEditMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
//               </DialogTitle>
//               <DialogDescription>
//                 {isEditMode
//                   ? "Chỉnh sửa thông tin sản phẩm"
//                   : "Nhập thông tin sản phẩm mới"}
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="product_name">Tên sản phẩm</Label>
//                   <Input
//                     id="product_name"
//                     name="product_name"
//                     value={formData.product_name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="category_id">Danh mục</Label>
//                   <select
//                     id="category_id"
//                     name="category_id"
//                     value={formData.category_id}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-2 py-1 border rounded"
//                   >
//                     <option value="">Chọn danh mục</option>
//                     {category.map((cat) => (
//                       <option key={cat.category_id} value={cat.category_id}>
//                         {cat.category_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* <div className="space-y-2">
//                   <Label htmlFor="agency_id">Đại lý</Label>
//                   <select
//                     id="agency_id"
//                     name="agency_id"
//                     value={formData.agency_id}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-2 py-1 border rounded"
//                   >
//                     <option value="">Chọn đại lý</option>
//                     {agencies.map((a) => (
//                       <option key={a.agency_id} value={a.agency_id}>
//                         {a.agency_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div> */}
//                 {/* <div className="space-y-2">
//                   <Label htmlFor="warehouse_id">Kho</Label>
//                   <select id="warehouse_id" name="warehouse_id" value={formData.warehouse_id} onChange={handleInputChange} required className="w-full px-2 py-1 border rounded">
//                     <option value="">Chọn kho</option>
//                     {warehouses.map((w) => (
//                       <option key={w.warehouse_id} value={w.warehouse_id}>{w.warehouse_name}</option>
//                     ))}
//                   </select>
//                 </div> */}
//                 <div className="space-y-2">
//                   <Label htmlFor="unit">Đơn vị tính</Label>
//                   <Input
//                     id="unit"
//                     name="unit"
//                     value={formData.unit}
//                     onChange={handleUnitChange}
//                     list="unit-list"
//                     required
//                     placeholder="Chọn hoặc nhập đơn vị"
//                     className="w-full px-2 py-1 border rounded"
//                   />
//                   <datalist id="unit-list">
//                     {units.map((u) => (
//                       <option key={u} value={u} />
//                     ))}
//                   </datalist>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="price">Giá (VNĐ)</Label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="number"
//                     min={0}
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {/* <div className="space-y-2">
//                   <Label htmlFor="number_of_inventory">Số lượng tồn kho</Label>
//                   <Input id="number_of_inventory" name="number_of_inventory" type="number" min={0} value={formData.number_of_inventory} onChange={handleInputChange} required />
//                 </div> */}
//                 <div className="space-y-2">
//                   <Label htmlFor="old_price">Giá cũ (nếu có)</Label>
//                   <Input
//                     id="old_price"
//                     name="old_price"
//                     type="number"
//                     min={0}
//                     value={formData.old_price}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="image">URL hình ảnh</Label>
//                 <Input
//                   id="image"
//                   name="image"
//                   value={formData.image}
//                   onChange={handleInputChange}
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Mô tả</Label>
//                 <Textarea
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   rows={3}
//                 />
//               </div>
//               <DialogFooter>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setIsDialogOpen(false)}
//                 >
//                   Hủy
//                 </Button>
//                 <Button type="submit" variant="outline">
//                   {isEditMode ? "Cập nhật" : "Thêm sản phẩm"}
//                 </Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//             <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
//             <Package className="w-4 h-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalProducts}</div>
//             <p className="text-xs text-muted-foreground">Sản phẩm trong kho</p>
//           </CardContent>
//         </Card>
//         {/* <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//             <CardTitle className="text-sm font-medium">Giá trị kho</CardTitle>
//             <DollarSign className="w-4 h-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">
//               {totalValue.toLocaleString("vi-VN")} đ
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Tổng giá trị hàng tồn
//             </p>
//           </CardContent>
//         </Card> */}
//         {/* <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//             <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
//             <Archive className="w-4 h-4 text-orange-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-orange-600">
//               {lowStockProducts}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Sản phẩm {"< 10"} cái
//             </p>
//           </CardContent>
//         </Card> */}
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//             <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
//             <ShoppingCart className="w-4 h-4 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">
//               {category.length}
//             </div>
//             <p className="text-xs text-muted-foreground">Loại sản phẩm</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/*Tìm kiếm và bộ lọc */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Danh sách sản phẩm</CardTitle>
//           <CardDescription>
//             Tìm kiếm và quản lý sản phẩm trong kho
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-4 mb-6 sm:flex-row">
//             <div className="relative flex-1 max-w-sm">
//               <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Tìm kiếm sản phẩm..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <select
//               className="w-[180px] border rounded px-2 py-1"
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               <option value="all">Tất cả danh mục</option>
//               {category.map((cat, index) => (
//                 <option key={cat.category_id || index} value={cat.category_id}>
//                   {cat.category_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Table */}
//           <div className="border rounded-md">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Hình ảnh</TableHead>
//                   <TableHead>Tên sản phẩm</TableHead>
//                   <TableHead>Danh mục</TableHead>
//                   <TableHead>Giá</TableHead>
//                   {/* <TableHead>Trạng thái</TableHead> */}
//                   <TableHead>Ngày tạo</TableHead>
//                   <TableHead className="text-right">Hành động</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredProducts.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} className="py-8 text-center">
//                       <div className="flex flex-col items-center gap-2">
//                         <Package className="w-8 h-8 text-muted-foreground" />
//                         <p className="text-muted-foreground">
//                           {searchTerm || categoryFilter !== "all"
//                             ? "Không tìm thấy sản phẩm phù hợp"
//                             : "Chưa có sản phẩm nào"}
//                         </p>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredProducts.map((product) => (
//                     <TableRow key={product.product_id}>
//                       <TableCell>
//                         <img
//                           src={product.image || "/placeholder.svg"}
//                           alt={product.product_name}
//                           className="object-cover w-16 h-16 border rounded-md"
//                         />
//                       </TableCell>
//                       <TableCell className="font-medium">
//                         {product.product_name}
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline">
//                           {category.find(
//                             (item) => item.category_id === product.category_id
//                           )?.category_name || "N/A"}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="font-medium">
//                         {Number(product.price).toLocaleString("vi-VN", {
//                           style: "currency",
//                           currency: "VND",
//                           minimumFractionDigits: 0,
//                           maximumFractionDigits: 0,
//                         })}
//                       </TableCell>
//                       {/* <TableCell>
//                         <Badge
//                           variant={"default"}
//                           className={
//                             "bg-green-100 text-green-800 hover:bg-green-200"
//                           }
//                         >
//                           Còn hàng
//                         </Badge>
//                       </TableCell> */}
//                       <TableCell className="text-sm text-muted-foreground">
//                         {product.createdAt
//                           ? new Date(product.createdAt).toLocaleDateString(
//                               "vi-VN"
//                             )
//                           : "N/A"}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleEdit(product)}
//                             title="Chỉnh sửa sản phẩm"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             variant="destructive"
//                             size="sm"
//                             onClick={() => handleDelete(product.id)}
//                             title="Xóa sản phẩm"
//                           >
//                             <Trash2 className="w-4 h-4 text-black" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


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
} from "lucide-react";
import axiosInstance from "@/lib/axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([
    "kg",
    "g",
    "lit",
    "Dang",
    "cai",
    "hop",
    "chai",
    "coc",
    "thung",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState({
    product_name: "",
    price: 0,
    description: "",
    old_price: "",
    image: "",
    category_id: "",
    agency_id: "1",
    warehouse_id: "",
    unit: "",
    number_of_inventory: 50,
  });
  const [category, setCategory] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const fetchProducts = async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/admin/products?page=${page}&limit=${limit}`);
      console.log("Response data:", response.data);
      if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
        const fetchProducts = response.data.data.data.map((p) => ({
          ...p,
          id: p.product_id,
          name: p.product_name,
          category:
            p.category && p.category.category_name
              ? p.category.category_name
              : "N/A",
        }));

        setProducts(fetchProducts);
        setTotalPages(response.data.data.totalPages || 1);
        setTotalItems(response.data.data.totalItems || fetchProducts.length);
        setCurrentPage(response.data.data.currentPage || page);
      } else {
        throw new Error("Dữ liệu sản phẩm không phải là mảng");
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
      toast.error("Không thể tải danh sách danh mục.");
    }
  };

  const fetchAgencies = async () => {
    try {
      const res = await axiosInstance.get("/agency");
      if (res.data && res.data.data) setAgencies(res.data.data);
    } catch (error) {
      toast.error("Không thể tải danh sách đại lý.");
    }
  };

  useEffect(() => {
    fetchProducts(1);
    fetchCategories();
    fetchAgencies();
  }, [limit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "unit" && value && !units.includes(value)) {
      setUnits((prev) => [...prev, value]);
    }
  };

  const resetForm = () => {
    setFormData({
      product_name: "",
      price: 0,
      description: "",
      old_price: "",
      image: "",
      category_id: "",
      agency_id: "1",
      warehouse_id: "",
      unit: "",
      number_of_inventory: 50,
    });
    setIsEditMode(false);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      unit: product.unit === "0" || product.unit === 0 ? "" : product.unit,
    });
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
      fetchProducts(currentPage);
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Xóa sản phẩm thất bại.");
    }
  };

  const handleUnitChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      unit: value,
    }));
    if (value && !units.includes(value)) {
      setUnits((prev) => [...prev, value]);
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
      categoryFilter === "all" ||
      String(product.category_id) === String(categoryFilter);

    return matchesSearch && matchesCategory;
  });

  const totalProducts = totalItems;
  const categories = [...new Set(products.map((product) => product.category))];

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.product_name ||
      !formData.category_id ||
      !formData.price ||
      !formData.unit ||
      formData.number_of_inventory === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }
    if (isEditMode) {
      try {
        await axiosInstance.put(`/admin/products/${formData.id}`, formData);
        toast.success("Cập nhật sản phẩm thành công!");
        fetchProducts(currentPage);
      } catch (error) {
        console.error("Failed to update product:", error);
        toast.error("Cập nhật sản phẩm thất bại.");
      }
    } else {
      try {
        const productData = {
          product_name: formData.product_name,
          price: Number(formData.price),
          description: formData.description,
          old_price: formData.old_price
            ? Number(formData.old_price)
            : undefined,
          image: formData.image,
          category_id: Number(formData.category_id),
          agency_id: formData.agency_id ? Number(formData.agency_id) : 1,
          warehouse_id: formData.warehouse_id
            ? Number(formData.warehouse_id)
            : null,
          unit: formData.unit,
          number_of_inventory: Number(formData.number_of_inventory),
        };
        await axiosInstance.post("/admin/products", productData);
        toast.success("Thêm sản phẩm thành công!");
        fetchProducts(currentPage);
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        toast.error("Thêm sản phẩm thất bại!");
      }
    }
    setIsDialogOpen(false);
    resetForm();
  }

  return (
    <div className="container px-4 py-8 mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
          <p className="mt-1 text-muted-foreground">
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
            <Button className="gap-2 text-black">
              <Plus variant="outline" className="w-4 h-4 text-black" />
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
                  <Label htmlFor="product_name">Tên sản phẩm</Label>
                  <Input
                    id="product_name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category_id">Danh mục</Label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="">Chọn danh mục</option>
                    {category.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Đơn vị tính</Label>
                  <Input
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleUnitChange}
                    list="unit-list"
                    required
                    placeholder="Chọn hoặc nhập đơn vị"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <datalist id="unit-list">
                    {units.map((u) => (
                      <option key={u} value={u} />
                    ))}
                  </datalist>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="old_price">Giá cũ (nếu có)</Label>
                  <Input
                    id="old_price"
                    name="old_price"
                    type="number"
                    min={0}
                    value={formData.old_price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">URL hình ảnh</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
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
                <Button type="submit" variant="outline">
                  {isEditMode ? "Cập nhật" : "Thêm sản phẩm"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Sản phẩm trong kho</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {category.length}
            </div>
            <p className="text-xs text-muted-foreground">Loại sản phẩm</p>
          </CardContent>
        </Card>
      </div>

      {/* Tìm kiếm và bộ lọc */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>
            Tìm kiếm và quản lý sản phẩm trong kho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
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
              {category.map((cat, index) => (
                <option key={cat.category_id || index} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
            <select
              className="w-[100px] border rounded px-2 py-1"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
                fetchProducts(1);
              }}
            >
              <option value={10}>10 / trang</option>
              <option value={20}>20 / trang</option>
              <option value={50}>50 / trang</option>
            </select>
          </div>

          {/* Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="w-8 h-8 text-muted-foreground" />
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
                          className="object-cover w-16 h-16 border rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.product_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {category.find(
                            (item) => item.category_id === product.category_id
                          )?.category_name || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {Number(product.price).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
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
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4 text-black" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Hiển thị {products.length} / {totalItems} sản phẩm
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchProducts(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Trang trước
              </Button>
              <div className="text-sm">
                Trang {currentPage} / {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchProducts(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Trang sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}