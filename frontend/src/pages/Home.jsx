import React, { useEffect, useState } from "react";
import "../css/home.css";
import ProductList from "@/pages/ProductList";
import CategoriesList from "@/common/Categories/CategoriesList";
import Banner from "@/common/Banner/Banner";
import axiosInstance from "@/lib/axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get("/product");
      setProducts(data.data);
      console.log("Products fetched successfully", data.data);
      if (data.error) {
        console.error("Error fetching products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products,categories:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products // Nếu chọn "Tất cả", hiển thị toàn bộ sản phẩm
      : products.filter(
          // Ngược lại, lọc theo category_id. Cần chuyển đổi `selectedCategory` thành số.
          (product) => product.category_id === selectedCategory
        );

  const handleCategorySelect = async (categoryId) => {
    console.log("Selected category ID:", categoryId);
    // setSelectedCategory(categoryId);
    try {
      const { data } = await axiosInstance.get("/product/category/" + categoryId); // Lấy sản phẩm theo category_id
      setProducts(data.data);
      console.log("Products fetched successfully", data.data);
      if (data.error) {
        console.error("Error fetching products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products,categories:", error);
    }
  };
  const showAllProducts = () => {
    setSelectedCategory("all");
    fetchData();
  };

  return (
    <div className="home-container">
      <Banner />
      <CategoriesList
        onCategorySelect={handleCategorySelect} // show theo phân loại
        onShowAll={showAllProducts} // show hết
      />
      <ProductList filteredProducts={products} />
    </div>
  );
}
