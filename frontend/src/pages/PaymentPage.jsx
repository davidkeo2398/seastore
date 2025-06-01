// src/pages/PaymentPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function PaymentPage() {
  const { cart, getCartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const total = getCartTotal();

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    alert(`Thanh toán thành công bằng ${paymentMethod}!`);
    navigate("/");
  };

  return (
    <div className="payment-container">
      <h1 className="text-3xl font-bold mb-8 text-center">Thanh toán</h1>
      <div className="payment-form">
        <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
        <ul className="mb-4">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold mb-4">Tổng tiền: ${total.toFixed(2)}</p>
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
          className="payment-button w-full"
          onClick={handlePayment}
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
}