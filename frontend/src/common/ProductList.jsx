import React, { useEffect, useState } from "react";
import "../css/productList.css";

export default function ProductList(data) {
  const { products } = data;
  const [isVisible, setIsVisible] = useState(false);
  // isVisible: Trạng thái hiển thị của sản phẩm.
  useEffect(() => {
    console.log(products);
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  return (
    <div className="products-list">
      {/* mobile: 1, tablet: 2, laptop: 3, desktop: 4, large desktop: 5 */}
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div
            className={`product-card flex flex-col items-center ${
              isVisible ? "animate-in" : ""
            }`}
            key={product.id}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            {/*flex-1: Cho phép phần tử này mở rộng để chiếm hết không gian còn lại,xếp các item con theo chiều dọc */}
            <div className="product-info w-full text-center flex-1 flex flex-col">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              {/*product-meta: Lớp CSS tùy chỉnh.
              flex: Kích hoạt Flexbox.
              justify-between: Căn các item con cách đều nhau trên trục chính (giữa product-price và product-rate).
              items-center: Căn giữa các item con theo chiều dọc.
              mb-3: Margin-bottom (lề dưới) là 12px (hoặc 0.75rem).
              text-sm: Kích thước chữ nhỏ.*/}
              <div className="product-meta flex justify-between items-center mb-3 text-sm">
                <span className="product-price">${product.price}</span>
                <span className="product-rate"> ⭐ {product.rate}</span>
              </div>
              <div className="product-actions flex gap-2 w-full">
                <button className="btn-add-cart flex-1">Add to Cart</button>
                <button className="btn-detail flex-1">Get Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
