import React from "react";
import "../css/home.css";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Apple's latest flagship smartphone with A17 chip.",
    price: 1199,
    rate: 4.8,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    description: "The newest Galaxy with advanced AI camera.",
    price: 999,
    rate: 4.7,
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/levant/sm-s921bzadmea/gallery/levant-galaxy-s24-s921-sm-s921bzadmea-thumb-539246469",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling headphones.",
    price: 399,
    rate: 4.9,
    image: "https://m.media-amazon.com/images/I/61v6lGqKJGL._AC_SL1500_.jpg",
  },
  {
    id: 4,
    name: "MacBook Air M3",
    description: "Ultra-thin laptop with Apple M3 chip.",
    price: 1299,
    rate: 4.95,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-13-midnight-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707348936757",
  },
  {
    id: 5,
    name: "MacBook Air M3",
    description: "Ultra-thin laptop with Apple M3 chip.",
    price: 1299,
    rate: 4.95,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-13-midnight-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707348936757",
  },
  {
    id: 6,
    name: "MacBook Air M3",
    description: "Ultra-thin laptop with Apple M3 chip.",
    price: 1299,
    rate: 4.95,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-13-midnight-gallery1-202402?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1707348936757",
  },
];

export default function Home() {
  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-blur"></div>
        <div className="banner-content">
          <h2 className="banner-title">Big Summer Sale!</h2>
          <p className="banner-desc">
            Up to 50% off on selected products. Shop now!
          </p>
        </div>
      </div>
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
    </div>
  );
}
