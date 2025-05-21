import React, { use, useEffect } from "react";
import "../css/productList.css";

export default function ProductList(data) {
    const {products} = data;
  useEffect(() => {
    console.log(products);
  }, []);
  return (
    <div className="products-list">
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-meta">
                <span className="product-price">${product.price}</span>
                <span className="product-rate"> ⭐ {product.rate}</span>
              </div>
              <div className="product-actions">
                <button className="btn-add-cart">Add to Cart</button>
                <button className="btn-detail">Get Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
