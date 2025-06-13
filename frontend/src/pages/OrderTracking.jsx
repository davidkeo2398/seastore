import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/lib/axios";

const paymentStatusConfig = {
  pending: { label: "Chờ thanh toán", color: "bg-yellow-100 text-yellow-800" },
  paid: { label: "Đã thanh toán", color: "bg-green-100 text-green-800" },
  failed: { label: "Thanh toán thất bại", color: "bg-red-100 text-red-800" },
};

export default function OrderTrackingWithCheckboxes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const orderFromCheckout = location.state?.order;

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price ?? 0);

  // Cập nhật trạng thái thanh toán
  const handleChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: newStatus } : order
      )
    );
  };

  useEffect(() => {
    let ignore = false;

    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/order");
        if (!ignore) {
          setOrders(
            (res.data.data || []).map((order) => ({
              ...order,
              paymentStatus: order.paymentStatus ?? "pending",
            }))
          );
        }
      } catch (err) {
        if (!ignore) setOrders([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    if (orderFromCheckout) {
      const orderWithPayment = {
        ...orderFromCheckout,
        paymentStatus: orderFromCheckout.paymentStatus ?? "pending",
      };
      setOrders([orderWithPayment]);
      setLoading(false);
    } else {
      fetchOrders();
    }

    return () => {
      ignore = true;
    };
  }, [orderFromCheckout]);

  // // Nếu có đơn hàng từ Checkout thì hiển thị nó
  // useEffect(() => {
  //   if (orderFromCheckout) {
  //     const orderWithPayment = {
  //       ...orderFromCheckout,
  //       paymentStatus: orderFromCheckout.paymentStatus || "pending",
  //     };
  //     setOrders([orderWithPayment]);
  //   } else {
  //     // Dữ liệu mẫu nếu không có đơn hàng truyền sang
  //     setOrders([]);
  //   }
  // }, [orderFromCheckout]);

  // const handlePayment = async (orderId) => {
  //   setPaymentProcessing(true);
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     setOrders((prev) =>
  //       prev.map((order) =>
  //         order.id === orderId ? { ...order, paymentStatus: "paid" } : order
  //       )
  //     );

  //     alert("Thanh toán thành công!");
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     alert("Thanh toán thất bại. Vui lòng thử lại.");
  //   } finally {
  //     setPaymentProcessing(false);
  //   }
  // };

  // const saveStatusChanges = async () => {
  //   setSavingChanges(true);
  //   try {
  //     // Simulate API call to save changes
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     // Here you would make actual API calls to update the orders
  //     console.log("Saving status changes:", statusChanges);

  //     setStatusChanges({}); // Clear pending changes
  //     alert("Cập nhật trạng thái thành công!");
  //   } catch (error) {
  //     console.error("Error saving changes:", error);
  //     alert("Lỗi khi cập nhật trạng thái!");
  //   } finally {
  //     setSavingChanges(fal                                         se);
  //   }
  // };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Danh sách đơn hàng</h1>

      {orders.length === 0 ? (
        <p>Không có đơn hàng nào được hiển thị.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow space-y-3 bg-white"
          >
            <h2 className="text-lg font-semibold text-blue-700">
              Đơn hàng #{index + 1} ({order.orderNumber || order.id})
            </h2>

            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <strong>Đại lý:</strong> {order.agency_name}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {order.address_agency}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order.phone_agency}
              </p>
              <p>
                <strong>Ngày đặt:</strong> {order.order_date}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong>{" "}
                {order.payment_method === "cash"
                  ? "Tiền mặt"
                  : order.payment_method}
              </p>
              <select
                value={order.paymentStatus || "pending"}
                onChange={(e) => handleChange(order.id, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {Object.entries(paymentStatusConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="font-semibold">Sản phẩm đã đặt</h3>
              <ul className="list-disc list-inside text-sm text-gray-800">
                {(order.products || []).map((product, idx) => (
                  <li key={product.id || idx}>
                    {product.name} x {product.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-gray-600">
              Tổng cộng:{" "}
              <span className="font-semibold text-blue-600">
                {formatPrice(order.total)}
              </span>
            </div>

            <div>
              <label className="text-sm mr-2">Trạng thái thanh toán:</label>
              <select
                value={order.paymentStatus ?? "pending"}
                onChange={(e) => handleChange(order.id, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {Object.entries(paymentStatusConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            <span
              className={`inline-block px-2 py-1 rounded text-xs ${
                paymentStatusConfig[order.paymentStatus].color
              }`}
            >
              {paymentStatusConfig[order.paymentStatus].label}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
