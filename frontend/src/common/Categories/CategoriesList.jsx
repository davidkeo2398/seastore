import React from "react";
import "./CategoriesList.css";

const categories = [
  "Smartphone",
  "Laptop",
  "Tablet",
  "Headphone",
  "Smartwatch",
  "Accessories",
  "Camera",
  "Monitor",
  "Printer",
  "Speaker",
  "Keyboard",
  "Mouse",
];

export default function CategoriesList() {
  return (
    <div className="categories-list">
      {categories.map((cat, idx) => (
        <button className="category-btn" key={idx}>
          {cat}
        </button>
      ))}
    </div>
  );
}
