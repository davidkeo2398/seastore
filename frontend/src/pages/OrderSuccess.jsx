import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateStatusOrder = async () => {
    try {
      const order = JSON.parse(localStorage.getItem("order"));

      const response = await axiosInstance.patch(`/order/${order.order_id}/status`, {
        status: "paid",
      });
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Cập nhật trạng thái đơn hàng thất bại.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get("vnp_ResponseCode");

    if (responseCode !== "00") {
      // Nếu mã phản hồi không phải là 00, chuyển hướng về giỏ hàng
      toast.error("Thanh toán bị hủy hoặc thất bại. Bạn đã quay lại giỏ hàng.");
      navigate("/cart");
    }
    if (responseCode === "00") {
      // Nếu thanh toán thành công, hiển thị thông báo thành công
      // updateStatusOrder();

      toast.success("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="p-8 text-center bg-green-100 border border-green-300 rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-green-700">
          Mua hàng thành công!
        </h2>
        <p className="mb-4 text-green-800">
          Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => {navigate("/cart")
            updateStatusOrder()
          }}>
            Mua tiếp
          </Button>
          <Button variant="outline" onClick={() => {navigate("/orderTracking");
            updateStatusOrder()
          }}>
            Xem đơn đã mua
          </Button>
        </div>
      </div>
    </div>
  );
}
