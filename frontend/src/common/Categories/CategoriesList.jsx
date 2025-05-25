import React, { useState } from "react";
import "./CategoriesList.css";

const categories = [
  { id: 1, name: "Smartphone", image: "https://cdn-icons-png.flaticon.com/512/724/724664.png" },
  { id: 2, name: "Laptop", image: "https://cdn-icons-png.flaticon.com/512/1792/1792804.png" },
  { id: 3, name: "Tablet", image: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png" },
  { id: 4, name: "Headphone", image: "https://cdn-icons-png.flaticon.com/512/727/727245.png" },
  { id: 5, name: "Smartwatch", image: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png" },
  { id: 6, name: "Accessories", image: "https://cdn-icons-png.flaticon.com/512/2921/2921817.png" },
  { id: 7, name: "Camera", image: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png" },
  { id: 8, name: "Monitor", image: "https://cdn-icons-png.flaticon.com/512/2921/2921821.png" },
  { id: 9, name: "Printer", image: "https://cdn-icons-png.flaticon.com/512/2921/2921819.png" },
  { id: 10, name: "Speaker", image: "https://cdn-icons-png.flaticon.com/512/727/727240.png" },
  { id: 11, name: "Keyboard", image: "https://cdn-icons-png.flaticon.com/512/2921/2921818.png" },
  { id: 12, name: "Mouse", image: "https://cdn-icons-png.flaticon.com/512/2921/2921815.png" },
];

export default function CategoriesList() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            className={`category-card ${hovered === category.id ? "hovered" : ""}`}
            key={category.id}
            onMouseEnter={() => setHovered(category.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
