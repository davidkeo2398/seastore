import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get("vnp_ResponseCode");

    if (responseCode !== "00") {
      // Nếu mã phản hồi không phải là 00, chuyển hướng về giỏ hàng
      alert("Thanh toán bị hủy hoặc thất bại. Bạn đã quay lại giỏ hàng.");
      navigate("/cart");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="p-8 text-center bg-green-100 border border-green-300 rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-green-700">Mua hàng thành công!</h2>
        <p className="mb-4 text-green-800">Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/cart")}>Mua tiếp</Button>
          <Button variant="outline" onClick={() => navigate("/orderTracking")}>Xem đơn đã mua</Button>
        </div>
      </div>
    </div>
  );
}