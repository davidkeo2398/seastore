import React, { useEffect, useState } from "react";
import "./CategoriesList.css";
import axiosInstance from "@/lib/axios";


export default function CategoriesList({ onCategorySelect, onShowAll }) {
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
      <h2 className="categories-title">Tất cả danh mục </h2>

      <div className="categories-grid">          

        {categories.map((category, index) => ( //click vào danh mục để xem sản phẩm
          <div
            className={`category-card ${
              hovered === category.id ? "hovered" : ""
            }`}
            key={index}
            // onMouseEnter={() => setHovered(category.id)}
            // onMouseLeave={() => setHovered(null)}
            onClick={() =>
              onCategorySelect && onCategorySelect(category.category_id)
            } 
          >
            <img
              src={
                category.category_id
                  ? `/images/category_${category.category_id}.png` // Giả sử ảnh được lưu theo định dạng category_id.png
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
