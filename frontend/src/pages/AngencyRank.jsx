import { useNavigate } from "react-router-dom";
import {  Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AgencyRankPage() {
  const navigate = useNavigate();
  const agencyDetails = {
    name: "Lesch, Hane and Kunde",
    rank: "Premium",
    benefits: ["10% commission", "Priority support", "Exclusive products"],
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết hạng đại lý</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Tên đại lý:</strong> {agencyDetails.name}</p>
          <p><strong>Hạng:</strong> {agencyDetails.rank}</p>
          <p><strong>Phần trăm được giảm:</strong></p>
          <ul className="list-disc pl-5">
            {agencyDetails.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/cart")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại giỏ hàng
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}