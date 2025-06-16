import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function AgencyRankPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agencyRankId } = location.state || {};

  const [agencyRankDetails, setAgencyRankDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const agencyDetails = {
  //   name: "Lesch, Hane and Kunde",
  //   rank: "Premium",
  //   benefits: ["10% commission", "Priority support", "Exclusive products"],
  // };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (agencyRankId) {
      const fetchAgencyRankDetails = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get(
            `/agency-rank/${agencyRankId}`
          );
          if (response.data && response.data.data) {
            setAgencyRankDetails(response.data.data);
          } else {
            setError("Không tìm thấy chi tiết hạng đại lý.");
          }
        } catch (err) {
          console.error("Lỗi khi lấy chi tiết hạng đại lý:", err);
          setError("Không thể tải chi tiết hạng đại lý. Vui lòng thử lại sau.");
        } finally {
          setLoading(false);
        }
      };
      fetchAgencyRankDetails();
    } else {
      setLoading(false);
      setError("Không có ID hạng đại lý để hiển thị.");
    }
  }, [agencyRankId]);

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết hạng đại lý</CardTitle>
        </CardHeader>
        <CardContent>
          <>
            {loading ? (
              <div>Đang tải chi tiết hạng đại lý...</div>
            ) : error ? (
              <div className="text-red-600">Lỗi: {error}</div>
            ) : agencyRankDetails ? (
              <>
                <p>
                  <strong>Id hạng:</strong> {agencyRankDetails.agency_rank_id}
                </p>

                <p>
                  <strong>Tên hạng:</strong> {agencyRankDetails.agency_rank_name}
                </p>

                <p>
                  <strong>Giá trị tích lũy tối thiểu:</strong>{" "}
                  {formatCurrency(agencyRankDetails.min_accumulated_value)}
                </p>

                <p>
                  <strong>Phần trăm được giảm:</strong> {agencyRankDetails.discount_percent}%
                </p>
                {agencyRankDetails.note && (
                  <p>
                    <strong>Ghi chú:</strong> {agencyRankDetails.note}
                  </p>
                )}
              </>
            ) : (
              <div>Không tìm thấy thông tin hạng đại lý.</div>
            )}

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/cart")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại giỏ hàng
            </Button>
          </>
        </CardContent>
      </Card>
    </div>
  );
}
