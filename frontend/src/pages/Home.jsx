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



  // const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  // const [sortOrder, setSortOrder] = useState("asc"); // Thứ tự sắp xếp: asc hoặc desc
  // const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity }); // Khoảng giá
  // console.log("Price range:", priceRange);

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
      const { data } = await axiosInstance.get("/categoríes");
      setCategories(data.data); // Lưu danh sách danh mục
      console.log("Categories fetched successfully", data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductCount = async (categoryId) => {
    try {
      const { data } = await axiosInstance.get(
        `/product/category/${categoryId}`
      );
      setCategoryProductCount(data.data);
      console.log("Category product count:", data.data);
    } catch (error) {
      console.error("Error fetching product count by category:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchProductCount();
  }, []);

  useEffect(() => {
    console.log("All products:", allProducts);
    console.log("Selected category:", selectedCategory);

    const filtered = allProducts
      .filter((product) => {
        const matchesName = product.product_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" ||
          product.category_id === Number(selectedCategory);

        // const matchesPrice =
        //   product.price >= priceRange.min && product.price <= priceRange.max;
        // console.log("Matches price:", matchesPrice); // Kiểm tra điều kiện giá

        return matchesName && matchesCategory ;
      });
      // .sort((a, b) => {
      //   if (sortOrder === "asc") {
      //     return a.price - b.price;
      //   } else {
      //     return b.price - a.price;
      //   }
      // });

    console.log("Filtered products:", filtered);

    setProducts(filtered);
  },
  // CẬP NHẬT KHI CÓ SỰ THAY ĐỔI CÁC BIẾN -> kích hoạt useEffect
  [allProducts, searchTerm, selectedCategory]); //]); 

  // Xử lý khi chọn danh mục
  const handleCategorySelect = (categoryId) => {
    console.log("Selected category ID:", categoryId);
    setSelectedCategory(categoryId); // Cập nhật danh mục được chọn
    //số lượng
    fetchProductCount(categoryId); // Lấy số lượng sản phẩm theo danh mục
    console.log("Fetching product count for category:", categoryId);
  };

  // Hiển thị tất cả sản phẩm
  const showAllProducts = () => {
    setSelectedCategory("all");
    console.log("Showing all products", allProducts);
  };

  

  const formatCurrency = (value) => {
    if (value === Infinity) return ""; // Nếu là Infinity, trả về chuỗi rỗng
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  // const handlePriceChange = (e) => {
  //   const { name, value } = e.target; // name là 'min' hoặc 'max'

  //   setPriceRange((prev) => ({
  //     ...prev,
  //     [name]:
  //       value === ""
  //         ? name === "max"
  //           ? Infinity
  //           : 0 // Nếu ô input rỗng, trả về giá trị mặc định
  //         : Number(value.replace(/\D/g, "")), // Loại bỏ ký tự không phải số
  //   }));
  // };

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

      {/* <div className="product-count">
        {categoryProductCount !== null && (
          <p>Số lượng sản phẩm trong danh mục: {categoryProductCount}</p>
        )}
      </div> */}
      
      {/* Lọc theo giá
      <div className="filter-panel">
        <div className="filter-item">
          <label>Khoảng giá:</label>
          <div className="price-range">
            <input
              type="text"
              name="min" // Thêm name="min"
              placeholder="Giá tối thiểu"
              value={priceRange.min === 0 ? "" : formatCurrency(priceRange.min)}
              onChange={handlePriceChange} // Sử dụng hàm chung
              className="price-input"
            />
            <span> - </span>
            <input
              type="text"
              name="max" // Thêm name="max"
              placeholder="Giá tối đa"
              value={
                priceRange.max === Infinity
                  ? ""
                  : formatCurrency(priceRange.max)
              }
              onChange={handlePriceChange} // Sử dụng hàm chung
              className="price-input"
            />
          </div>
        </div>
      </div> */}

      {/* Lọc theo thu tu 
      <div className="filter-panel">
        <div className="filter-item">
          <label>Sắp xếp:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="asc">Giá: Thấp đến Cao</option>
            <option value="desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div> */}

     

      <ProductList filteredProducts={products} />
    </div>
  );
}
