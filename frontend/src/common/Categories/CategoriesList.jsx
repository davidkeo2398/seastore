import React, { useEffect, useState } from "react";
import "./CategoriesList.css";
import axiosInstance from "@/lib/axios";

// const categories = [
//   {
//     id: 1,
//     name: "Smartphone",
//     image: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
//   },
//   {
//     id: 2,
//     name: "Laptop",
//     image: "https://cdn-icons-png.flaticon.com/512/1792/1792804.png",
//   },
//   {
//     id: 3,
//     name: "Tablet",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
//   },
//   {
//     id: 4,
//     name: "Headphone",
//     image: "https://cdn-icons-png.flaticon.com/512/727/727245.png",
//   },
//   {
//     id: 5,
//     name: "Smartwatch",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921820.png",
//   },
//   {
//     id: 6,
//     name: "Accessories",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921817.png",
//   },
//   {
//     id: 7,
//     name: "Camera",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921816.png",
//   },
//   {
//     id: 8,
//     name: "Monitor",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921821.png",
//   },
//   {
//     id: 9,
//     name: "Printer",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921819.png",
//   },
//   {
//     id: 10,
//     name: "Speaker",
//     image: "https://cdn-icons-png.flaticon.com/512/727/727240.png",
//   },
//   {
//     id: 11,
//     name: "Keyboard",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921818.png",
//   },
//   {
//     id: 12,
//     name: "Mouse",
//     image: "https://cdn-icons-png.flaticon.com/512/2921/2921815.png",
//   },
// ];

export default function CategoriesList() {
  const [hovered, setHovered] = useState(null);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/category");
      setCategories(data.data);
      console.log("Categories fetched successfully", data.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  useEffect(() => {
    try {
      fetchCategories();
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Tất cả danh mục của cửa hàng</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div
            className={`category-card ${
              hovered === category.id ? "hovered" : ""
            }`}
            key={index}
            onMouseEnter={() => setHovered(category.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={
                category.category_id
                  ?  `/images/category_${category.category_id}.png` // Giả sử ảnh được lưu theo định dạng category_id.png
                  : "/images/default-category.png" // Ảnh mặc định nếu không có ảnh
              }
              alt={category.category_name}
              className="category-image"
            />
            <h3 className="category-name">{category.category_name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
