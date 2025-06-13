import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: productData } = await axiosInstance.get("/product");
        const { data: categoryData } = await axiosInstance.get("/category");
        const filtered = (productData.data || []).filter(
          (product) => String(product.category_id) === String(id)
        );
        setProducts(filtered);
        const foundCategory = (categoryData.data || []).find(
          (cat) => String(cat.category_id) === String(id)
        );
        setCategory(foundCategory);
      } catch (err) {
        setError("Không thể tải sản phẩm hoặc danh mục.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        {category ? `Sản phẩm trong danh mục: ${category.category_name}` : "Danh mục không tồn tại"}
      </h2>
      {loading && <p>Đang tải sản phẩm...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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
                <h2 className="text-lg font-semibold mb-2 truncate" title={product.product_name}>{product.product_name}</h2>
                <p className="text-primary font-bold mb-2">{product.price ? `${Number(product.price).toLocaleString()} VND` : "N/A"}</p>
                <Button variant="outline" className="w-full">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          Không có sản phẩm nào trong danh mục này.
        </p>
      )}
    </div>
  );
} 