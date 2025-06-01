import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  //   const params = useParams()
  //   const navigate = useNavigate()
  //   const productId = params.id

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Không tìm thấy sản phẩm");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    const fetchRelated = async () => {
      if (!product) return;
      try {
        const data = await fetchRelatedProducts(product.category_id, product.id);
        setRelatedProducts(data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelated();
  }, [product]);

  //   // Fetch product details
  // useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     if (!productId) return

  //     try {
  //       setIsLoading(true)
  //       const response = await fetch(`/api/products/${productId}`)

  //       if (!response.ok) {
  //         throw new Error("Không tìm thấy sản phẩm")
  //       }

  //       const data = await response.json()
  //       setProduct(data)
  //     } catch (error) {
  //       console.error("Error fetching product details:", error)
  //       setProduct(null)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchProductDetails()
  // }, [productId])

  //   // Fetch related products
  //   useEffect(() => {
  //     const fetchRelatedProducts = async () => {
  //       if (!product) return

  //       try {
  //         const response = await fetch(`${API_URL}/products?category_id=${product.category_id}&limit=6`)
  //         const data = await response.json()

  //         // Filter out current product and limit to 3 items
  //         const related = data.filter((p: Product) => p.product_id !== product.product_id).slice(0, 3)
  //         setRelatedProducts(related)
  //       } catch (error) {
  //         console.error("Error fetching related products:", error)
  //       }
  //     }

  //     fetchRelatedProducts()
  //   }, [product, API_URL])

  const handleAddToCart = async () => {
    if (!product) return;
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, quantity);
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

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
          <Link to="/products">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
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
              {product.name}
            </h1>
            {product.brand && (
              <p className="text-blue-600 font-medium">
                Thương hiệu: {product.brand.name}
              </p>
            )}
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

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
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
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
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
                  className="w-16 px-3 py-2 text-center border-0 focus:ring-0"
                />
                <button
                  type="button"
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
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
              <button
                onClick={handleAddToCart}
                disabled={product.number_of_inventory === 0 || isAddingToCart}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center"
              >
                {isAddingToCart ? (
                  "Đang thêm..."
                ) : (
                  <>
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Thêm vào giỏ hàng
                  </>
                )}
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.684 13.342 8.684 13.342 8.684 13.342l4.162 4.162m0 0l4.162-4.162m-4.162 4.162V3m0 0h6.364M12 3H5.636" />
                </svg>
              </button>
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
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Sản phẩm liên quan
        </h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.product_id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    {relatedProduct.old_price && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
                        -
                        {calculateDiscount(
                          relatedProduct.old_price,
                          relatedProduct.price
                        )}
                        %
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl font-bold text-blue-600">
                      {formatPrice(relatedProduct.price)}
                    </span>
                    {relatedProduct.old_price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(relatedProduct.old_price)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Đơn vị: {relatedProduct.unit}
                  </p>
                  <Link to={`/products/${relatedProduct.product_id}`}>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-blue-50 hover:border-blue-300"
                    >
                      Xem chi tiết
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Không có sản phẩm liên quan.
          </p>
        )}
      </div>
    </div>
  );
}
