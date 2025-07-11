import React, { useEffect, useState } from "react";
import "../css/productList.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axiosInstance from "@/lib/axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ProductList({filteredProducts}) {
  // const { products } = data;
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  // isVisible: Trạng thái hiển thị của sản phẩm.
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const fetchProducts = async () => {
    try {
      // const { data } = await axiosInstance.get("/product");
      // setProducts(data.data);
      // setAllProducts(data.data);
      // console.log("Products fetched successfully", data.data);
      // if (data.error) {
      //   console.error("Error fetching products:", data.error);
      // }
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/category");
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1); // Default quantity of 1
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  // Hàm định dạng tiền tệ VNĐ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Không hiển thị số lẻ sau dấu phẩy (vd: 1.000.000₫ thay vì 1.000.000,00₫)
    }).format(amount);
  };
  
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const { data } = await axiosInstance.get("/product");
  //     setProducts(data.data);
  //     console.log("Products fetched successfully", data.data);
  //     if (data.error) {
  //       console.error("Error fetching products:", data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };
  // Filter logic
  // const filteredProducts = allProducts.filter((product) => {
  //   const matchesName = product.product_name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === "all" || product.category_id === selectedCategory;
  //   return matchesName && matchesCategory;
  // });
  return (
    <div className="products-list">
      {/* Filter section */}
      <div className="flex flex-col items-center justify-center w-full gap-4 mb-8 sm:flex-row">
        {/* <Input
          placeholder="Tìm kiếm theo tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        /> */}
        {/* <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tất cả danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      {/* mobile: 1, tablet: 2, laptop: 3, desktop: 4, large desktop: 5 */}
      <div className="grid grid-cols-1 gap-6 products-grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredProducts.map((product, index) => (
          <div
            className={`product-card flex flex-col items-center ${
              isVisible ? "animate-in" : ""
            }`}
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              className="product-image"
              src={product.image}
              alt={product.product_name}
            />
            {/*flex-1: Cho phép phần tử này mở rộng để chiếm hết không gian còn lại,xếp các item con theo chiều dọc */}
            <div className="flex flex-col flex-1 w-full text-center product-info">
              <h3 className="truncate product-title">{product.product_name}</h3>
              <p className="truncate product-desc">{product.description}</p>
              <div className="flex items-center justify-between mb-3 text-sm product-meta">
                <span className="product-price">
                  {formatCurrency(product.price)}{" "}
                </span>
                <span className="product-rate"> ⭐ {product.rate}</span>
              </div>
              <div className="flex w-full gap-2 product-actions">
                <button
                  className="flex-1 btn-add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="flex-1 btn-detail"
                  onClick={() => navigate(`/product/${product.product_id}`)}
                >
                  Chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">
          Không có sản phẩm nào được tìm thấy.
        </p>
      )}
    </div>
  );
}
