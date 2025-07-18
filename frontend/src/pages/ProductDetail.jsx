import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  Truck,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import { useCart } from "@/context/CartContext";
import axiosInstance from "@/lib/axios";
import { Link } from "react-router-dom";

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const navigate = useNavigate();
  const productId = params.id;

  const { id } = useParams();
  const { addToCart } = useCart();
  const fetchProductDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/product/${productId}`);
      console.log("debug details:", data.data);
      if (!data) {
        throw new Error("Không tìm thấy sản phẩm");
      }
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      navigate("/not-found");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Lấy sản phẩm liên quan
  const fetchRelatedProducts = async () => {
    setIsLoading(false);
    if (product) {
      try {
        const { data } = await axiosInstance.get(`/product`);
        console.log("debug related:", data.data);
        const related = data.data.filter(
          (p) =>
            p.category_id === product.category_id && p.id !== product.product_id
        );// lấy cùng danh mục, khác sp hiện tại
        console.log("debug related filter:", related);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    }
  };
  console.log("debug relatedProducts:", relatedProducts);

  // Khi productId chỉ chạy khi thay đổi, fetch chi tiết sản phẩm
  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Khi product đã có dữ liệu, fetch sản phẩm liên quan
  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  if (isLoading) {
    return <div className="py-8 text-center">Đang tải lại sản phẩm...</div>;
  }

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addToCart(product, quantity);
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  if (!product) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <div className="max-w-md mx-auto">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Không tìm thấy sản phẩm
          </h1>
          <p className="mb-6 text-gray-600">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          {/* <Link to="/products"> */}
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách sản phẩm
          </Button>
          {/* </Link> */}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid gap-8 mb-12 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.product_name}
              width={600}
              height={600}
              className="w-full h-auto border border-gray-200 rounded-lg shadow-lg"
            />
            {product.old_price && (
              <span className="absolute bg-red-500 top-4 left-4 hover:bg-red-600">
                -{calculateDiscount(product.old_price, product.price)}%
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {product.product_name}
            </h1>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
              {product.old_price && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.old_price)}
                </span>
              )}
            </div>
            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Số lượng</span>

                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.number_of_inventory}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Number.parseInt(e.target.value) || 1)
                      )
                    }
                    className="w-16 px-3 py-2 text-center border-0 focus:ring-0 focus:outline-none"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() =>
                      setQuantity(
                        Math.min(product.number_of_inventory, quantity + 1)
                      )
                    }
                    disabled={quantity >= product.number_of_inventory}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.number_of_inventory === 0 || isAddingToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isAddingToCart ? (
                    "Đang thêm..."
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2 " />
                      <span className="text-black">Thêm vào giỏ hàng</span>
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* <p className="text-sm text-gray-600">Đơn vị: {product.unit}</p> */}
          </div>

          
        </div>

        {/* Description */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Mô tả sản phẩm</h3>
          <p className="leading-relaxed text-gray-600">
            {product.description || "Không có mô tả cho sản phẩm này."}
          </p>
        </div>

        {/* Shipping Info */}
        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div className="flex items-center mb-2 space-x-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              Thông tin vận chuyển
            </span>
          </div>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Miễn phí vận chuyển cho đơn hàng trên 500.000đ</li>
            <li>• Giao hàng trong 2-3 ngày làm việc</li>
            <li>• Hỗ trợ đổi trả trong 7 ngày</li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Sản phẩm liên quan
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <Card
              key={relatedProduct.product_id}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-4 space-y-4">
                {/* Hình ảnh sản phẩm */}
                <Link
                  to={`/product/${relatedProduct.product_id}`}
                  className="block"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.product_name}
                    className="object-cover w-full h-40 mb-4 rounded-lg"
                  />
                </Link>

                {/* Tên sản phẩm */}
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {relatedProduct.product_name}
                </h3>

                {/* Giá sản phẩm */}
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-blue-600">
                    {formatPrice(relatedProduct.price)}
                  </span>
                  {relatedProduct.old_price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(relatedProduct.old_price)}
                    </span>
                  )}
                </div>

                {/* Nút hành động */}
                <div className="flex gap-2 mt-4">
                  {/* Nút Xem chi tiết */}
                  <Link
                    to={`/product/${relatedProduct.product_id}`}
                    className="flex-1 py-2 text-center text-black rounded-md shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  >
                    Xem chi tiết
                  </Link>

                  {/* Nút Thêm vào giỏ hàng
                  <button
                    className="flex-1 py-2 text-center text-white rounded-md shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                    onClick={() => addToCart(relatedProduct, 1)}
                  >
                    Thêm vào giỏ hàng
                  </button> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}