import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=> {
    console.log(searchParams.get("vnp_OrderType"));
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-green-100 border border-green-300 rounded-lg p-8 text-center shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Mua hàng thành công!</h2>
        <p className="text-green-800 mb-4">Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>
        <div className="flex gap-4 justify-center">
          <Button  variant="outline"  onClick={() => navigate("/cart")}>Mua tiếp</Button>
          <Button variant="outline" onClick={() => navigate("/orderTracking")}>Xem đơn đã mua</Button>
        </div>
      </div>
    </div>
  );
} 