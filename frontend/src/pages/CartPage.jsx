import { useEffect, useState, useCallback } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Star,
  Trophy,
  Check,
  X,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axiosInstance from "@/lib/axios";

// Mock cart data
// const initialCartItems = [
//   {
//     id: "1",
//     name: "Premium Wireless Headphones",
//     brand: "TechSound",
//     price: 2500000,
//     oldPrice: 3000000,
//     quantity: 2,
//     image: "/placeholder.svg?height=100&width=100",
//     unit: "chiếc",
//     inStock: true,
//   },
//   {
//     id: "2",
//     name: "Bluetooth Speaker Pro",
//     brand: "AudioMax",
//     price: 1800000,
//     oldPrice: 2200000,
//     quantity: 1,
//     image: "/placeholder.svg?height=100&width=100",
//     unit: "chiếc",
//     inStock: true,
//   },
//   {
//     id: "3",
//     name: "Gaming Mouse RGB",
//     brand: "GameTech",
//     price: 850000,
//     quantity: 3,
//     image: "/placeholder.svg?height=100&width=100",
//     unit: "chiếc",
//     inStock: false,
//   },
// ];
// Mock user data with total spent and rank details
const user = {
  currentRank: "Silver",
  totalSpent: 6000000, // Example: 6,000,000 VND spent
  totalScore: 1000,
};

// Membership rank thresholds and discounts
const rankThresholds = [
  { rank: "Silver", threshold: 5000000, discount: 5 }, // 5% discount
  { rank: "Gold", threshold: 10000000, discount: 10 }, // 10% discount
];

// useEffect(() => {
//   console.log("Cart updated:", cart);
//   setCartItems(cart);
// }, [cart]);

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, removeFromCart, getCartTotal } =
    useCart();

  //giảm giá
  const [couponCode, setCouponCode] = useState(localStorage.getItem("promotion_code") || "");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("Cart updated:", cart);
    setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
    fetchPromotion();
  }, [cart]);

  const fetchPromotion = async () => {
    const res = await axiosInstance.get("/promotion");
    console.log("promotion", res.data.data);
    setPromotions(res.data.data);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  //rank mói
  const getSubtotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Calculate points to earn (1 point per 10,000 VND, +50% for Gold rank)
  const getPointsToEarn = useCallback(() => {
    const basePoints = Math.floor(getSubtotal() / 10000);
    return user.currentRank === "Gold"
      ? Math.floor(basePoints * 1.5)
      : basePoints;
  }, [getSubtotal, user.currentRank]);

  // Calculate current rank discount and amount needed for next rank
  const getRankDetails = () => {
    const currentRankData = rankThresholds.find(
      (r) => r.rank === user.currentRank
    );
    const nextRankData = rankThresholds.find(
      (r) => r.threshold > user.totalSpent
    );

    return {
      currentDiscount: currentRankData ? currentRankData.discount : 0,
      nextRank: nextRankData ? nextRankData.rank : null,
      amountToNextRank: nextRankData
        ? nextRankData.threshold - user.totalSpent
        : 0,
    };
  };
  const rankDetails = getRankDetails();

  // const getTotal = () => {
  //   const rankDetails = getRankDetails();
  //   const subtotal = getSubtotal();
  //   const rankDiscount = subtotal * (rankDetails.currentDiscount / 100);
  //   return subtotal - couponDiscount - rankDiscount;
  // };

  const getTotal = useCallback(() => {
    return getSubtotal() - discount;
  }, [getSubtotal, discount]);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // // Mock user data (replace with actual user context or API call)
  // const user = {
  //   currentRank: "Silver", // Could be "Gold" for 50% bonus points
  //   totalScore: 1000,
  // };
  // // Calculate points to earn (1 point per 10,000 VND, +50% for Gold rank)
  // const getPointsToEarn = useCallback(() => {
  //   const basePoints = Math.floor(getSubtotal() / 10000);
  //   return user.currentRank === "Gold" ? Math.floor(basePoints * 1.5) : basePoints;
  // }, [getSubtotal, user.currentRank]);

  const calculateDiscount = (old_price, newPrice) => {
    return Math.round(((old_price - newPrice) / old_price) * 100);
  };
  // const updateQuantity = (id, newQuantity) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  const handleUpdateQuantity = (id, newQuantity) => {
    console.log("update quantity", id, newQuantity);
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity); // Gọi hàm từ context
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  // const getSubtotal = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };

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

  const getDiscount = (promotion_code) => {
    // return cartItems.reduce((total, item) => {
    //   if (item.old_price) {
    //     return total + (item.old_price - item.price) * item.quantity;
    //   }
    //   return total;
    // }, 0);
    const promotion = promotions.filter(
      (item) => item.promotion_code === promotion_code
    );
    const percent = promotion[0].promotion_percent / 100;
    const priceReduce = getCartTotal() * percent;
    setDiscount(priceReduce);
    localStorage.setItem("discount", priceReduce);
    localStorage.setItem("promotion_code", promotion_code);
    console.log("price reduce", priceReduce, percent, getCartTotal());
  };

  // const getTotal = () => {
  //   return getSubtotal();
  // };

  // const getTotalItems = () => {
  //   return cartItems.reduce((total, item) => total + item.quantity, 0);
  // };

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
            <Button
              size="lg"
              className="bg-blue-600 text-black hover:bg-blue-700"
            >
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
            {cartItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.product_name}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                      {item.old_price && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 text-xs"
                        >
                          -{calculateDiscount(item.old_price, item.price)}%
                        </Badge>
                      )}
                      {item.number_of_inventory === 0 && (
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
                          onClick={() => removeItem(item.product_id)}
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
                        {item.old_price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.old_price)}
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
                              handleUpdateQuantity(
                                item.product_id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item.product_id,
                                Number.parseInt(e.target.value) || 1
                              )
                            }
                            disabled={item.quantity >= item.number_of_inventory}
                            className="h-8 w-16 text-center border-0 focus-visible:ring-0"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product_id,
                                item.quantity + 1
                              )
                            }
                            disabled={item.quantity > item.number_of_inventory}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.old_price && (
                            <p className="text-sm text-green-600">
                              Tiết kiệm{" "}
                              {formatPrice(
                                (item.old_price - item.price) * item.quantity
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

          {/* Order Summary & Points */}
          <div className="space-y-6">
            {/* Points Preview */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Star className="h-5 w-5 mr-2" />
                  Thông tin thành viên
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Hạng thành viên:
                    </span>
                    <Badge className="bg-blue-500 text-white">
                      <Trophy className="h-3 w-3 mr-1" />
                      {user.currentRank}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Giảm giá hạng:
                    </span>
                    <span className="font-medium">
                      {rankDetails.currentDiscount}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Đã chi tiêu:</span>
                    <span className="font-medium">
                      {formatPrice(user.totalSpent)}
                    </span>
                  </div>
                  {rankDetails.nextRank && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Còn lại để lên {rankDetails.nextRank}:
                      </span>
                      <span className="font-medium">
                        {formatPrice(rankDetails.amountToNextRank)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Điểm hiện tại:
                    </span>
                    <span className="font-medium">
                      {user.totalScore.toLocaleString()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">
                      Điểm sẽ nhận:
                    </span>
                    <span className="font-bold text-blue-700">
                      +{getPointsToEarn()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    * 1 điểm = 10,000 VND. Hạng {user.currentRank} nhận thêm{" "}
                    {user.currentRank === "Gold" ? "50" : "0"}% điểm
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => navigate("/rank")}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Xem chi tiết hạng đại lý
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Tóm tắt đơn hàng
                  </h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span>{formatPrice(getSubtotal())}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className="text-green-600">Miễn phí</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Coupon Code Input */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Mã giảm giá</p>
                    <div className="flex space-x-2 ">
                      <Select
                        value={couponCode}
                        onValueChange={(value) => {
                          setCouponCode(value === "none" ? "" : value);
                          getDiscount(value);
                        }}
                        disabled={isApplyingCoupon || appliedCoupon !== null}
                      >
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="Chọn mã giảm giá" />
                        </SelectTrigger>
                        <SelectContent className="w-[300px] max-h-[200px] overflow-y-auto">
                          {/* "None" option with value "none" */}
                          <SelectItem value="none">Không chọn</SelectItem>

                          {promotions.map((promotion, index) => (
                            <SelectItem
                              key={index}
                              value={promotion.promotion_code}
                              className="w-[300px]"
                            >
                              {promotion.promotion_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      isLoading ||
                      cartItems.some((item) => item.number_of_inventory === 0)
                    }
                  >
                    {isLoading ? "Đang xử lý..." : "Tiến hành thanh toán"}
                  </Button>

                  {cartItems.some((item) => item.number_of_inventory === 0) && (
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
    </div>
  );
}
