import React, { useEffect, useState } from "react";
import "../css/productList.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axiosInstance from "@/lib/axios";

export default function ProductList() {
  // const { products } = data;
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  // isVisible: Trạng thái hiển thị của sản phẩm.
  useEffect(() => {
    console.log(products);
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  const handleAddToCart = (product) => {
    addToCart(product, 1); // Default quantity of 1
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/product");
      setProducts(data.data);
      console.log("Products fetched successfully", data.data);
      if(data.error) {
        console.error("Error fetching products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <div className="products-list">
      {/* mobile: 1, tablet: 2, laptop: 3, desktop: 4, large desktop: 5 */}
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            className={`product-card flex flex-col items-center ${
              isVisible ? "animate-in" : ""
            }`}
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            {/*flex-1: Cho phép phần tử này mở rộng để chiếm hết không gian còn lại,xếp các item con theo chiều dọc */}
            <div className="product-info w-full text-center flex-1 flex flex-col">
              <h3 className="product-title truncate">{product.product_name}</h3>
              <p className="product-desc truncate">{product.description}</p>
              <div className="product-meta flex justify-between items-center mb-3 text-sm">
                <span className="product-price">${product.price}</span>
                <span className="product-rate"> ⭐ {product.rate}</span>
              </div>
              <div className="product-actions flex gap-2 w-full">
                <button
                  className="btn-add-cart flex-1"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn-detail flex-1"
                  onClick={() => navigate(`/product/${product.product_id}`)}
                >
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
