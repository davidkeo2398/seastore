// src/pages/PaymentPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";


export default function PaymentPage() {
  const { cart, getCartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const total = getCartTotal();

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    toast.success(`Thanh toán thành công bằng ${paymentMethod}!`);
    navigate("/");
  };

  return (
    <div className="payment-container">
      <h1 className="mb-8 text-3xl font-bold text-center">Thanh toán</h1>
      <div className="payment-form">
        <h2 className="mb-4 text-xl font-semibold">Tóm tắt đơn hàng</h2>
        <ul className="mb-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="mb-4 text-lg font-bold">Tổng tiền: ${total.toFixed(2)}</p>
        <label className="text-gray-700">Phương thức thanh toán:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mb-4"
        >
          <option value="">Chọn phương thức</option>
          <option value="Credit Card">Thẻ tín dụng</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Thanh toán khi nhận hàng</option>
        </select>
        <button
          className="w-full payment-button"
          onClick={handlePayment}
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
}