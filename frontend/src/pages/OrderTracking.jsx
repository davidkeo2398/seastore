import { useEffect, useState } from "react";
import {
  CreditCard,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  RefreshCw,
  ArrowLeft,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocation } from "react-router-dom";

export default function OrderTrackingWithCheckboxes() {
  const location = useLocation();
  const { order: createdOrder } = location.state || {}; // Lấy order từ location.state

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOrderId, setSearchOrderId] = useState(
    createdOrder?.order_id?.toString() || ""
  ); // Khởi tạo từ createdOrder
  const [isProcessing, setIsProcessing] = useState(false);

  // const [paymentProcessing, setPaymentProcessing] = useState(false);
  // const [statusChanges, setStatusChanges] = useState({}); // Track status changes
  // const [savingChanges, setSavingChanges] = useState(false);

  // const mockOrders = [
  //       {
  //         order_id: 1,
  //         order_code: "20250615214714375",
  //         user_id: 5,
  //         user_name: "Elouise_Hintz",
  //         full_name: "Violet Rolfson",
  //         user_email: "Watson56@hotmail.com",
  //         address_user: "73872 Russell Street",
  //         agency_name: "Bradtke, Grimes and Kunde",
  //         address_agency: "216 Brakus Stravenue",
  //         phone_user: "(786) 522-6644 x55203",
  //         phone_agency: "1-765-911-1571",
  //         total: 66.73,
  //         promotion_id: 5,
  //         order_date: "2024-07-02 15:33:29",
  //         payment_method: "bank_transfer",
  //         promotion_code: "nMvmAUZ6Ks",
  //         status: "pending",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 2,
  //         order_code: "20250615214714375",
  //         user_id: 5,
  //         user_name: "Domenick_Rogahn",
  //         full_name: "Monserrat Herzog",
  //         user_email: "Benny.Kerluke@hotmail.com",
  //         address_user: "32972 Savanah Plains",
  //         agency_name: "Ruecker, Langworth and Gusikowski",
  //         address_agency: "9054 Wyman Fort",
  //         phone_user: "764.735.3457 x1000",
  //         phone_agency: "357.930.0018",
  //         total: 32.33,
  //         promotion_id: 1,
  //         order_date: "2025-04-28 04:21:31",
  //         payment_method: "cash",
  //         promotion_code: "0aN9J5mGMd",
  //         status: "cancelled",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 3,
  //         order_code: "20250615214714375",
  //         user_id: 9,
  //         user_name: "Jessyca_Bode",
  //         full_name: "Meda Bergstrom",
  //         user_email: "Karlie_Upton@gmail.com",
  //         address_user: "471 S Broad Street",
  //         agency_name: "Schmeler - Schamberger",
  //         address_agency: "76682 W Broadway Avenue",
  //         phone_user: "(285) 383-9962",
  //         phone_agency: "399-494-3908 x51546",
  //         total: 25.65,
  //         promotion_id: 10,
  //         order_date: "2025-06-11 19:40:45",
  //         payment_method: "paypal",
  //         promotion_code: "RGM5UYZKDm",
  //         status: "cancelled",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 4,
  //         order_code: "20250615214714375",
  //         user_id: 3,
  //         user_name: "Yolanda_Brown",
  //         full_name: "Ellen Green",
  //         user_email: "Ruby_Kuphal51@gmail.com",
  //         address_user: "1976 Gilbert Creek",
  //         agency_name: "Medhurst - Green",
  //         address_agency: "19105 Lincoln Highway",
  //         phone_user: "385.772.6413 x05921",
  //         phone_agency: "(767) 399-3444 x030",
  //         total: 68.75,
  //         promotion_id: 3,
  //         order_date: "2024-09-23 07:27:50",
  //         payment_method: "cash",
  //         promotion_code: "fGgt2hHIVX",
  //         status: "pending",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 5,
  //         order_code: "20250615214714375",
  //         user_id: 4,
  //         user_name: "Lenora_Nader",
  //         full_name: "Kira Purdy",
  //         user_email: "Kole11@gmail.com",
  //         address_user: "5822 Highfield Road",
  //         agency_name: "Lubowitz LLC",
  //         address_agency: "9545 Brian Canyon",
  //         phone_user: "(355) 267-7304 x9653",
  //         phone_agency: "354.518.8573 x3142",
  //         total: 23.06,
  //         promotion_id: 2,
  //         order_date: "2024-12-25 18:55:09",
  //         payment_method: "cash",
  //         promotion_code: "viBfEbkOsF",
  //         status: "completed",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 6,
  //         order_code: "20250615214714375",
  //         user_id: 5,
  //         user_name: "Colton_Dickens",
  //         full_name: "Yoshiko Kemmer",
  //         user_email: "Jovanny42@yahoo.com",
  //         address_user: "417 Larch Close",
  //         agency_name: "McKenzie, Connelly and Ortiz",
  //         address_agency: "9226 Haylie Expressway",
  //         phone_user: "(737) 323-3312 x093",
  //         phone_agency: "718.336.7334",
  //         total: 70.59,
  //         promotion_id: 10,
  //         order_date: "2025-06-09 11:28:41",
  //         payment_method: "momo",
  //         promotion_code: "tK71J9pMgB",
  //         status: "completed",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 7,
  //         order_code: "20250615214714375",
  //         user_id: 10,
  //         user_name: "Tess_Kemmer",
  //         full_name: "Gregorio Hoeger",
  //         user_email: "Christy_Waelchi@hotmail.com",
  //         address_user: "8466 Osinski Meadow",
  //         agency_name: "Nikolaus Group",
  //         address_agency: "8863 The Grove",
  //         phone_user: "(530) 644-0658 x9548",
  //         phone_agency: "(368) 928-4065 x78837",
  //         total: 35.09,
  //         promotion_id: 4,
  //         order_date: "2025-01-11 19:31:53",
  //         payment_method: "paypal",
  //         promotion_code: "61ZvvWhHW9",
  //         status: "completed",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 8,
  //         order_code: "20250615214714375",
  //         user_id: 4,
  //         user_name: "Mike_Kling",
  //         full_name: "Cedrick Ritchie",
  //         user_email: "Alvena_Bashirian@yahoo.com",
  //         address_user: "44587 Murazik Throughway",
  //         agency_name: "Nienow Group",
  //         address_agency: "48961 Adams Street",
  //         phone_user: "(523) 814-3078 x600",
  //         phone_agency: "984.787.6423 x53780",
  //         total: 0.62,
  //         promotion_id: 8,
  //         order_date: "2024-12-23 20:20:54",
  //         payment_method: "momo",
  //         promotion_code: "15tbZJSOPv",
  //         status: "completed",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 9,
  //         order_code: "20250615214714375",
  //         user_id: 5,
  //         user_name: "Cheyanne_Runte",
  //         full_name: "Libby Cole",
  //         user_email: "Saul15@gmail.com",
  //         address_user: "90878 Long Lane",
  //         agency_name: "Schowalter Inc",
  //         address_agency: "43680 Alexandra Oval",
  //         phone_user: "1-361-506-3422 x07823",
  //         phone_agency: "(581) 861-5477 x8894",
  //         total: 2.01,
  //         promotion_id: 5,
  //         order_date: "2024-10-14 12:42:31",
  //         payment_method: "momo",
  //         promotion_code: "b8GzHtRAyd",
  //         status: "cancelled",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //       {
  //         order_id: 10,
  //         order_code: "20250615214714375",
  //         user_id: 1,
  //         user_name: "Lesley_Lebsack",
  //         full_name: "Cory Schroeder-Beer",
  //         user_email: "Maia_Kirlin37@hotmail.com",
  //         address_user: "73941 Clarence Street",
  //         agency_name: "Kassulke LLC",
  //         address_agency: "4140 N Union Street",
  //         phone_user: "(957) 275-2891",
  //         phone_agency: "580.637.2904 x8745",
  //         total: 30.83,
  //         promotion_id: 5,
  //         order_date: "2025-02-11 02:05:42",
  //         payment_method: "paypal",
  //         promotion_code: "qBjwDRp7RW",
  //         status: "cancelled",
  //         createdAt: "2025-06-15 14:47:14",
  //         updatedAt: "2025-06-15 14:47:14",
  //       },
  //     ];

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/order/my-order");
      if (response.data && response.data.data.length > 0) {
        setOrders(response.data.data);
        setLoading(false);
      } else {
        setOrders([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Fallback to mock data in case of an API error
      setOrders([]);
      setLoading(false);
    }
  };

  // Mock data - replace with actual API call
  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    // Nếu có đơn hàng mới được tạo, cập nhật searchOrderId và có thể làm nổi bật nó
    if (createdOrder) {
      setSearchOrderId(createdOrder.order_id.toString());
      // Bạn có thể thêm logic để làm nổi bật đơn hàng này trong danh sách nếu muốn
      // Ví dụ: setOrders(prevOrders => [createdOrder, ...prevOrders.filter(o => o.order_id !== createdOrder.order_id)]);
    }
  }, [createdOrder]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Không hiển thị số lẻ sau dấu phẩy (vd: 1.000.000₫ thay vì 1.000.000,00₫)
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // const handleCompleteOrder = async(orderId){
  //   if (isProcessing)
  //     return; //chan double
  //   setIsProcessing(true);
  //   try {
  //     await axiosInstance.post(`/order/complete/${orderId}`);
  //     await  fetchOrders(); // Cập nhật lại danh sách đơn hàng

  //   } catch (error) {
  //     console.error(error);

  //   }finally{
  //     setIsProcessing(false);
  //   }
  // }
  const getStatusText = (status) => {
    switch (status) {
      case "processing":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      default:
        return status; // Hiển thị trạng thái gốc nếu không khớp
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchOrderId.toLowerCase();
    return (
      !searchOrderId ||
      order.order_id.toString().includes(search) ||
      (order.full_name && order.full_name.toLowerCase().includes(search)) ||
      (order.user_email && order.user_email.toLowerCase().includes(search))
    );
  });

  // if (loading) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="max-w-4xl mx-auto">
  //         <div className="animate-pulse space-y-4">
  //           <div className="h-8 bg-gray-200 rounded w-1/3"></div>
  //           <div className="h-64 bg-gray-200 rounded"></div>
  //           <div className="h-64 bg-gray-200 rounded"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng đã đặt</h1>
      {/* <div className="mb-4">
        <Input
          type="text"
          placeholder="Tìm kiếm theo tên, email,hoặc ID..."
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
          className="max-w-sm"
        />
      </div> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Tổng đơn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead>Ngày tạo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((orders) => (
              <TableRow key={orders.order_id}>
                <TableCell className="font-medium">{orders.order_code}</TableCell>
                <TableCell>{formatCurrency(orders.total)}</TableCell>
                <TableCell>{orders.status}</TableCell>
                <TableCell>{orders.payment_method}</TableCell>
                <TableCell>{formatDate(orders.order_date)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={11}
                className="text-center text-muted-foreground py-4"
              >
                Không tìm thấy order cho tài khoản này
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
