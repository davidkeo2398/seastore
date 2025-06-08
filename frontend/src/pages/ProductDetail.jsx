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

// const mockProduct = {
//   id: "1",
//   name: "Premium Wireless Headphones",
//   brand: { name: "TechSound" },
//   price: 2500000,
//   old_price: 3000000,
//   unit: "chiếc",
//   number_of_inventory: 15,
//   description:
//     "Tai nghe không dây cao cấp với chất lượng âm thanh vượt trội, pin 30 giờ và công nghệ chống ồn chủ động. Thiết kế ergonomic mang lại sự thoải mái tối đa cho người sử dụng.",
//   image:
//     "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
// };

// const mockRelatedProducts = [
//   {
//     product_id: "2",
//     name: "Bluetooth Speaker Pro",
//     price: 1800000,
//     old_price: 2200000,
//     unit: "chiếc",
//     image:
//       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
//   },
//   {
//     product_id: "3",
//     name: "Gaming Mouse RGB",
//     price: 850000,
//     unit: "chiếc",
//     image:
//       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
//   },
//   {
//     product_id: "4",
//     name: "Mechanical Keyboard",
//     price: 1500000,
//     old_price: 1800000,
//     unit: "chiếc",
//     image:
//       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
//   },
// ];
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
  const fetchRelatedProducts = async () => {
    setIsLoading(false);

    if (product) {
      try {
        const { data } = await axiosInstance.get(`/product`);
        console.log("debug related:", data.data);
        const related = data.data.filter(
          (p) => p.category_id === product.category_id && p.id !== product.product_id
        );
        console.log("debug related filter:", related);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    }
  };

  // Khi productId thay đổi, fetch chi tiết sản phẩm
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
    return <div className="text-center py-8">Đang tải lại sản phẩm...</div>;
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
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-600 mb-6">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          {/* <Link to="/products"> */}
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách sản phẩm
          </Button>
          {/* </Link> */}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.product_name}
              width={600}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg border border-gray-200"
            />
            {product.old_price && (
              <span className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                -{calculateDiscount(product.old_price, product.price)}%
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
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
            <p className="text-sm text-gray-600">Đơn vị: {product.unit}</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              Tồn kho:{" "}
              <span className="font-medium">
                {product.number_of_inventory} {product.unit}
              </span>
            </span>
            {product.number_of_inventory > 0 ? (
              <Badge
                variant="secondary"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Còn hàng
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-red-50 text-red-700 border-red-200"
              >
                Hết hàng
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description || "Không có mô tả cho sản phẩm này."}
          </p>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label
              htmlFor="quantity"
              className="text-sm font-medium text-gray-700"
            >
              Số lượng:
            </label>
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
                  setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))
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
                  <ShoppingCart className="mr-2 h-4 w-4 " />
                  <span className="text-black">Thêm vào giỏ hàng</span>
                </>
              )}
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              Thông tin vận chuyển
            </span>
          </div>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Miễn phí vận chuyển cho đơn hàng trên 500.000đ</li>
            <li>• Giao hàng trong 2-3 ngày làm việc</li>
            <li>• Hỗ trợ đổi trả trong 7 ngày</li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Sản phẩm liên quan
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card
              key={relatedProduct.product_id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4 space-y-4">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.product_name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">
                  {relatedProduct.product_name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">
                    {formatPrice(relatedProduct.price)}
                  </span>
                  {relatedProduct.old_price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(relatedProduct.old_price)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
