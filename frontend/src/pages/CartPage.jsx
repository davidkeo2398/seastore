import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    brand: "TechSound",
    price: 2500000,
    oldPrice: 3000000,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    unit: "chiếc",
    inStock: true,
  },
  {
    id: "2",
    name: "Bluetooth Speaker Pro",
    brand: "AudioMax",
    price: 1800000,
    oldPrice: 2200000,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    unit: "chiếc",
    inStock: true,
  },
  {
    id: "3",
    name: "Gaming Mouse RGB",
    brand: "GameTech",
    price: 850000,
    quantity: 3,
    image: "/placeholder.svg?height=100&width=100",
    unit: "chiếc",
    inStock: false,
  },
];

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //giảm giá
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const applyCoupon = async () => {
    setIsApplyingCoupon(true);
    setCouponError("");
    // Giả lập kiểm tra mã giảm giá
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (couponCode.trim().toLowerCase() === "giamgia50") {
      setAppliedCoupon(couponCode);
      setCouponDiscount(50000); // Giảm 50.000đ
      setCouponError("");
    } else {
      setCouponError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      setAppliedCoupon(null);
      setCouponDiscount(0);
    }
    setIsApplyingCoupon(false);
  };

  const getDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.oldPrice) {
        return total + (item.oldPrice - item.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const getTotal = () => {
    return getSubtotal();
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Đang chuyển đến trang thanh toán...");
    navigate("/PayCheckout");
    setIsLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Giỏ hàng trống
            </h1>
            <p className="text-gray-600 mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm
              tuyệt vời của chúng tôi!
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng</h1>
            <p className="text-gray-600 mt-1">
              {getTotalItems()} sản phẩm trong giỏ hàng
            </p>
          </div>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tiếp tục mua sắm
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                      {item.oldPrice && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 text-xs"
                        >
                          -{calculateDiscount(item.oldPrice, item.price)}%
                        </Badge>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                          <Badge variant="secondary" className="text-xs">
                            Hết hàng
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-blue-600">
                          {formatPrice(item.price)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.oldPrice)}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          /{item.unit}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1 || !item.inStock}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Number.parseInt(e.target.value) || 1
                              )
                            }
                            disabled={!item.inStock}
                            className="h-8 w-16 text-center border-0 focus-visible:ring-0"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={!item.inStock}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.oldPrice && (
                            <p className="text-sm text-green-600">
                              Tiết kiệm{" "}
                              {formatPrice(
                                (item.oldPrice - item.price) * item.quantity
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatPrice(getDiscount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Coupon Code Input */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Mã giảm giá</p>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Nhập mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={isApplyingCoupon || appliedCoupon !== null}
                      className="flex-1"
                    />
                    {appliedCoupon ? (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponDiscount(0);
                        }}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4 mr-1 text-black" /> Hủy
                      </Button>
                    ) : (
                      <Button
                        onClick={applyCoupon}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="shrink-0 bg-blue-600 hover:bg-blue-700 text-bl"
                      >
                        {isApplyingCoupon ? "..." : "Áp dụng"}
                      </Button>
                    )}
                  </div>

                  {couponError && (
                    <Alert variant="destructive" className="mt-2 py-2">
                      <AlertDescription className="text-xs flex items-center">
                        <X className="h-3 w-3 mr-1" /> {couponError}
                      </AlertDescription>
                    </Alert>
                  )}

                  {appliedCoupon && (
                    <Alert className="mt-2 py-2 bg-green-50 border-green-200 text-green-800">
                      <AlertDescription className="text-xs flex items-center">
                        <Check className="h-3 w-3 mr-1" /> Đã áp dụng mã "
                        {appliedCoupon}"
                        {couponDiscount > 0 &&
                          ` - Giảm ${formatPrice(couponDiscount)}`}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Tổng cộng</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(getTotal())}
                  </span>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-black"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={
                    isLoading || cartItems.some((item) => !item.inStock)
                  }
                >
                  {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
                </Button>

                {cartItems.some((item) => !item.inStock) && (
                  <p className="text-sm text-red-600 mt-2 text-center">
                    Vui lòng xóa sản phẩm hết hàng để tiếp tục
                  </p>
                )}

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Ưu đãi đặc biệt
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Miễn phí vận chuyển cho đơn hàng trên 500.000đ</li>
                    <li>• Đổi trả miễn phí trong 7 ngày</li>
                    <li>• Bảo hành chính hãng</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
