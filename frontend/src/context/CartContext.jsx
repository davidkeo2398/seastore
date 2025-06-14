import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product_id === product.product_id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      localStorage.setItem("cart", JSON.stringify([...prevCart, { ...product, quantity }]));
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (product_id, quantity) => {
    setCart((prevCart) => {
      const cart = prevCart.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    });
  };

  const removeFromCart = (product_id) => {
    setCart((prevCart) =>
    {
      const cart = prevCart.filter((item) => item.product_id !== product_id);
      localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
    );
  };

  const getCartTotal = () => {
    const cartLocal = JSON.parse(localStorage.getItem('cart'));
    return cartLocal?.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
