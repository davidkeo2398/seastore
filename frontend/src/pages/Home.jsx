import React, { useEffect, useState } from "react";
import "../css/home.css";
import ProductList from "@/pages/ProductList";
import CategoriesList from "@/common/Categories/CategoriesList";
import Banner from "@/common/Banner/Banner";
import axiosInstance from "@/lib/axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1); // Current page
  const [size, setSize] = useState(10); // Number of products per page
  
  // page: trang hiện tại; size: số lượng sản phẩm trên mỗi trang; search: từ khóa tìm kiếm
  const fetchProducts = async (page = 1, size = 10, search = "") => {
    try {
      const { data } = await axiosInstance.get("/product", {
        params: { page, size, search }, // Pass page, size, and search as query parameters
      });
      setProducts(data.data.rows); // Update products with paginated and filtered data
      console.log("Products fetched successfully", data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/category");
      setCategories(data.data); // Save category list
      console.log("Categories fetched successfully", data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //tìm kiwm sản phẩm
  const handleSearchProduct = () => {
    fetchProducts(page, size, searchTerm);
  };

  useEffect(() => {
    fetchProducts(page, size, searchTerm); // Fetch products with pagination and search
    fetchCategories();
  }, [page, size, searchTerm]);

  const handleCategorySelect = (categoryId) => {
    console.log("Selected category ID:", categoryId);
    setSelectedCategory(categoryId); // Update selected category
  };

  const showAllProducts = () => {
    setSelectedCategory("all");
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // Go to the next page
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // Go to the previous page
  };

  return (
    <div className="home-container">
      <Banner />

      <CategoriesList
        onCategorySelect={handleCategorySelect} // Filter by category
        onShowAll={showAllProducts} // Show all products
      />

      <div className="search-bar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            className="search-input"
          />
          <button className="search-button" onClick={handleSearchProduct}>
            🔍 Tìm kiếm
          </button>
        </div>
      </div>

      <ProductList filteredProducts={products} />

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Trước
        </button>
        <span>Trang {page}</span>
        <button onClick={handleNextPage}>Tiếp theo</button>
      </div>
    </div>
  );
}
