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
// import { toast } from "sonner";
// import { Plus, Edit, Trash2 } from "lucide-react";
// import axiosInstance from "@/lib/axios";

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     category_name: "",
//     description: "",
//   });

//   const fetchCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/admin/categories");
//       if (response.data && response.data.data) {
//         setCategories(response.data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//       toast.error("Không thể tải danh sách danh mục.");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       category_name: "",
//       description: "",
//     });
//     setIsEditMode(false);
//   };

//   const handleEdit = (category) => {
//     setFormData({
//         id: category.category_id || category.id, // Sử dụng category_id nếu có, ngược lại dùng id
//       category_name: category.category_name,
//       description: category.description,
//     });
//     setIsEditMode(true);
//     setIsDialogOpen(true);
//   };

//   const handleDelete = async (categoryId) => {
//     if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
//       return;
//     }

//     try {
//       await axiosInstance.delete(`/admin/categories/${categoryId}`);
//       toast.success("Xóa danh mục thành công!");
//       fetchCategories();
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//       toast.error("Xóa danh mục thất bại.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.category_name) {
//       toast.error("Vui lòng nhập tên danh mục!");
//       return;
//     }

//     try {
//       if (isEditMode) {
//         await axiosInstance.put(`/admin/categories/${formData.id}`, formData);
//         toast.success("Cập nhật danh mục thành công!");
//       } else {
//         await axiosInstance.post("/admin/categories", formData);
//         toast.success("Thêm danh mục thành công!");
//       }
//       setIsDialogOpen(false);
//       resetForm();
//       fetchCategories();
//     } catch (error) {
//       console.error("Failed to save category:", error);
//       toast.error("Lưu danh mục thất bại.");
//     }
//   };

//   return (
//     <div className="container px-4 py-8 mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
//           <p className="mt-1 text-muted-foreground">
//             Quản lý thông tin danh mục sản phẩm
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
//               <Plus className="w-4 h-4 text-black" />
//               Thêm danh mục
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>
//                 {isEditMode ? "Cập nhật danh mục" : "Thêm danh mục mới"}
//               </DialogTitle>
//               <DialogDescription>
//                 {isEditMode
//                   ? "Chỉnh sửa thông tin danh mục"
//                   : "Nhập thông tin danh mục mới"}
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="category_name">Tên danh mục</Label>
//                 <Input
//                   id="category_name"
//                   name="category_name"
//                   value={formData.category_name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Mô tả</Label>
//                 <Input
//                   id="description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
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
//                   {isEditMode ? "Cập nhật" : "Thêm danh mục"}
//                 </Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Table */}
//       <div className="border rounded-md">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Tên danh mục</TableHead>
//               <TableHead>Mô tả</TableHead>
//               <TableHead className="text-right">Hành động</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {categories.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={3} className="py-8 text-center">
//                   Không có danh mục nào.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               categories.map((category) => (
//                 <TableRow key={category.id}>
//                   <TableCell>{category.category_name}</TableCell>
//                   <TableCell>{category.description || "Không có mô tả"}</TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleEdit(category)}
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => handleDelete(category.category_id)}
//                       >
//                         <Trash2 className="w-4 h-4 text-black" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }