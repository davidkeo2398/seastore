// tạo giao diện cho bảng khuyến mãi
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Trash2,
  Search,
  Package,
  Plus,
  Edit,
  ShoppingCart,
  DollarSign,
  Archive,
  List,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function PromotionPage() {
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);

  // const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  // const [selectedPromotion, setSelectedPromotion] = useState(null); // Khuyến mãi được chọn để sửa
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Hiển thị dialog sửa
  // const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // Hiển thị dialog thêm
  // const [formData, setFormData] = useState({
  //   promotion_name: "",
  //   promotion_code: "",
  //   promotion_percent: "",
  //   promotion_condition: "",
  //   promotion_created_date: "",
  //   promotion_expired_date: "",
  // }); // Dữ liệu form

  // Fetch promotions from API
  const fetchPromotions = async () => {
    try {
      const response = await axiosInstance.get("/admin/promotions");
      setPromotions(response.data.data || []);
      setFilteredPromotions(response.data.data || []);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setPromotions([]);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // const handleAddPromotion = async () => {
  //   try {
  //     const response = await axiosInstance.post("/admin/promotions", formData);
  //     toast.success("Thêm khuyến mãi thành công!");
  //     fetchPromotions(); // Refresh danh sách
  //     setIsAddDialogOpen(false); // Đóng dialog
  //   } catch (error) {
  //     console.error("Error adding promotion:", error);
  //     toast.error("Thêm khuyến mãi thất bại!");
  //   }
  // };

  // const handleEditPromotion = async () => {
  //   try {
  //     const response = await axiosInstance.put(
  //       `/admin/promotions/${selectedPromotion.promotion_id}`,
  //       formData
  //     );
  //     toast.success("Sửa khuyến mãi thành công!");
  //     fetchPromotions(); // Refresh danh sách
  //     setIsEditDialogOpen(false); // Đóng dialog
  //   } catch (error) {
  //     console.error("Error editing promotion:", error);
  //     toast.error("Sửa khuyến mãi thất bại!");
  //   }
  // };

  // const handleDeletePromotion = async (promotionId) => {
  //   try {
  //     await axiosInstance.delete(`/admin/promotions/${promotionId}`);
  //     toast.success("Xóa khuyến mãi thành công!");
  //     fetchPromotions(); // Refresh danh sách
  //   } catch (error) {
  //     console.error("Error deleting promotion:", error);
  //     toast.error("Xóa khuyến mãi thất bại!");
  //   }
  // };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Quản lý Khuyến Mãi</h1>
      {/* <Button
        onClick={() => setIsAddDialogOpen(true)}
        className="mb-4 text-color-blue-600"
      >
        Thêm Khuyến Mãi
      </Button> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên Khuyến Mãi</TableHead>
            <TableHead>Mã Khuyến Mãi</TableHead>
            <TableHead>Giá Trị Giảm Giá</TableHead>
            <TableHead>Ngày Bắt Đầu</TableHead>
            <TableHead>Ngày Kết Thúc</TableHead>
            <TableHead>Điều kiện Sử Dụng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPromotions.map((promotion) => (
            <TableRow key={promotion.promotion_id}>
              <TableCell>{promotion.promotion_id}</TableCell>
              <TableCell>{promotion.promotion_name}</TableCell>
              <TableCell>{promotion.promotion_code}</TableCell>
              <TableCell>{promotion.promotion_percent}</TableCell>
              <TableCell>
                {new Date(
                  promotion.promotion_created_date
                ).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(
                  promotion.promotion_expired_date
                ).toLocaleDateString()}
              </TableCell>
              <TableCell>{promotion.promotion_condition}</TableCell>
              {/* <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedPromotion(promotion);
                    setFormData(promotion);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDeletePromotion(promotion.promotion_id)}
                  className="ml-2"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={() => {
          setIsAddDialogOpen(false);
          setIsEditDialogOpen(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAddDialogOpen ? "Thêm Khuyến Mãi" : "Sửa Khuyến Mãi"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isAddDialogOpen ? handleAddPromotion() : handleEditPromotion();
            }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Tên Khuyến Mãi
              </label>
              <input
                type="text"
                placeholder="Tên Khuyến Mãi"
                value={formData.promotion_name}
                onChange={(e) =>
                  setFormData({ ...formData, promotion_name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Mã Khuyến Mãi
              </label>
              <input
                type="text"
                placeholder="Mã Khuyến Mãi"
                value={formData.promotion_code}
                onChange={(e) =>
                  setFormData({ ...formData, promotion_code: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Phần Trăm Giảm Giá
              </label>
              <input
                type="number"
                placeholder="Phần Trăm Giảm Giá"
                value={formData.promotion_percent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotion_percent: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Điều Kiện
              </label>
              <input
                type="text"
                placeholder="Điều Kiện"
                value={formData.promotion_condition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotion_condition: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Ngày Bắt Đầu
              </label>
              <input
                type="date"
                placeholder="Ngày Bắt Đầu"
                value={formData.promotion_created_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotion_created_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Ngày Kết Thúc
              </label>
              <input
                type="date"
                placeholder="Ngày Kết Thúc"
                value={formData.promotion_expired_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    promotion_expired_date: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end col-span-2">
              <Button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded"
              >
                {isAddDialogOpen ? "Thêm" : "Sửa"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
