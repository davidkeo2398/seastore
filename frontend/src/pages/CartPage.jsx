// src/pages/CartPage.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../css/cart.css"; 
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();

  return (
    <div className="cart-container">
      <h1 className="text-3xl font-bold mb-8 text-center">Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p className="mb-4 text-gray-600">Giỏ hàng của bạn trống.</p>
          <button
            className="cart-button"
            onClick={() => navigate("/products")}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                  <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <p>Tổng tiền: ${total.toFixed(2)}</p>
            <button
              className="cart-button"
              onClick={() => navigate("/payment")}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}