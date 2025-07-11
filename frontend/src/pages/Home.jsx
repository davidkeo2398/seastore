import React, { useEffect, useState } from "react";
import "../css/home.css";
import ProductList from "@/pages/ProductList";
import CategoriesList from "@/common/Categories/CategoriesList";
import Banner from "@/common/Banner/Banner";
import axiosInstance from "@/lib/axios";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/product");
      setAllProducts(data.data);
      setProducts(data.data); // Lưu tất cả sản phẩm để lọc sau này
      console.log("Products fetched successfully", data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/categories");
      setCategories(data.data); // Lưu danh sách danh mục
      console.log("Categories fetched successfully", data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const matchesName = product.product_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()); // Lọc theo tên sản phẩm
        selectedCategory === "all" || // Nếu chọn "Tất cả", không cần lọc
        product.category_id === Number(selectedCategory); // Lọc theo danh mục
        return matchesName ;
      });
    setProducts(filtered); // Cập nhật danh sách sản phẩm hiển thị
  }, [allProducts, searchTerm, selectedCategory]);

  // Xử lý khi chọn danh mục
  const handleCategorySelect = (categoryId) => {
    console.log("Selected category ID:", categoryId);
    setSelectedCategory(categoryId); // Cập nhật danh mục được chọn
  };

  // Hiển thị tất cả sản phẩm
  const showAllProducts = () => {
    setSelectedCategory("all");
  };

  return (
    <div className="home-container">
      <Banner />

      <CategoriesList
        onCategorySelect={handleCategorySelect} // Lọc theo danh mục
        onShowAll={showAllProducts} // Hiển thị tất cả sản phẩm
      />

      <div className="search-bar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa tìm kiếm
            className="search-input"
          />
          <button
            className="search-button"
            onClick={() => console.log("Tìm kiếm:", searchTerm)}
          >
            🔍 Tìm kiếm
          </button>
        </div>
      </div>

      <ProductList filteredProducts={products} />
    </div>
  );
}
