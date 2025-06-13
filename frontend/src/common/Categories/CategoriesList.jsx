import React, { useEffect, useState } from "react";
import "./CategoriesList.css";
import axiosInstance from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CategoriesList() {
  const [hovered, setHovered] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/category");
      setCategories(data.data);
      console.log("Categories fetched successfully", data.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };
  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get("/product");
      setAllProducts(data.data || []);
      setProducts(data.data || []);
    } catch (error) {
      console.error("Error loading all products:", error);
      setError("Failed to load all products.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    try {
      fetchCategories();
      fetchAllProducts();
    } catch (error) {
      console.error("Error loading categories or products:", error);
    }
  }, []);
  //chon category
  const handleCategoryClick = (category) => {
    navigate(`/category/${category.category_id}`);


    // if (selectedCategory && selectedCategory.category_id === category.category_id) {
    //   setSelectedCategory(null);
    //   setProducts(allProducts);
    // } else {
    //   setSelectedCategory(category);
    //   // Lọc sản phẩm theo category_id
    //   const filtered = allProducts.filter(
    //     (product) => product.category_id === category.category_id
    //   );
    //   setProducts(filtered);
    // }
  };

  // Filtered products for display
  const filteredProducts = selectedCategory
    ? products
    : allProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Tất cả danh mục của cửa hàng
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card
              key={category.category_id}
              className={`hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer ${selectedCategory?.category_id === category.category_id ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleCategoryClick(category)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <img
                  src={category.category_id ? `/images/category_${category.category_id}.png` : "/images/default-category.png"}
                  alt={category.category_name}
                  className="w-16 h-16 object-cover mb-2 rounded-full"
                />
                <span className="text-lg font-medium">
                  {category.category_name}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {selectedCategory
            ? `Sản phẩm trong danh mục: ${selectedCategory.category_name}`
            : "Tất cả sản phẩm"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.product_id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product.product_id}`)}
            >
              <CardContent className="p-4">
                <img
                  src={product.image || "/images/default-product.png"}
                  alt={product.product_name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h2 className="text-lg font-semibold mb-2">{product.product_name}</h2>
                <p className="text-primary font-bold mb-2">{product.price ? `${Number(product.price).toLocaleString()} VND` : "N/A"}</p>
                <Button variant="outline" className="w-full">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            Không có sản phẩm nào được tìm thấy.
          </p>
        )}
      </section> */}
    </div>
  );
}
