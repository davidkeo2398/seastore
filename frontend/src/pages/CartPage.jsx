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
import { useNavigate, useLocation } from "react-router-dom";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, addToCart, updateQuantity, removeFromCart, getCartTotal } =
    useCart();

  //giảm giá
  const [couponCode, setCouponCode] = useState(
    localStorage.getItem("promotion_code") || ""
  );
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  //rank
  const [userInfo, setUserInfo] = useState({});
  const [agency, setAgency] = useState(null);
  const [rankDiscountPercent, setRankDiscountPercent] = useState(0);
  const [rankDiscountAmount, setRankDiscountAmount] = useState(0); // tien giảm giá từ rank

  const getSubtotal = useCallback(() => {
    return cartItems.reduce(
      (currentTotal, item) => currentTotal + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  //tông tiền của giỏ hàng, gọi callback để tính toán lại khi có sự thay đổi
  const getTotal = useCallback(() => {
    const subtotal = getSubtotal(); //  trước giảm giá
    return subtotal - rankDiscountAmount - discount;
  }, [getSubtotal, rankDiscountAmount, discount]);

  // tổng sô lượng sản phẩm trong giỏ hàng
  const getTotalItems = useCallback(() => {
    return cartItems.reduce(
      (currentTotal, item) => currentTotal + item.quantity,
      0
    );
  }, [cartItems]);

  useEffect(() => {
    // lấy thông tin user và agency
    const fetchUserAndAgency = async () => {
      try {
        const userRes = await axiosInstance.get("/auth/userInfo");
        const userData = userRes.data?.data;
        setUserInfo(userData);

        // Debug
        console.log("User Data after fetch:", userData);
        console.log("User Role Name:", userData?.role?.role_name);
        console.log("User Agency Rank ID:", userData?.user?.agency_rank_id);

        if (
          userData?.role?.role_name === "admin_agency" &&
          userData?.user?.agency_rank_id
        ) {
          // lấy thông tin agency rank nếu người dùng là admin_agency
          const agencyRankRes = await axiosInstance.get(
            `/agency-rank/${userData.user.agency_rank_id}`
          );
          setAgency(agencyRankRes.data.data);
          const percent = agencyRankRes.data.data.discount_percent || 0;
          setRankDiscountPercent(percent);
        }
        // k phải agency
        else {
          setAgency(null);
          setRankDiscountPercent(0);
        }
      } catch (error) {
        console.error("Error fetching user or agency info:", error);
        setUserInfo({});
        setAgency(null);
        setRankDiscountPercent(0);
      }
    };
    fetchUserAndAgency();
  }, []); // chỉ chạy 1 lần khi component mount

  useEffect(() => {
    console.log("Cart updated:", cart);
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []); // cap nhat ds sp trong gio
    fetchPromotion();
  }, [cart]);

  // chiết khấu từ rank
  useEffect(() => {
    const subtotal = getSubtotal();
    // tien chiet khau: tong tiền * phần trăm giảm giá rank
    const calRankDiscount = subtotal * (rankDiscountPercent / 100);
    localStorage.setItem("calRankDiscount", calRankDiscount);
    setRankDiscountAmount(calRankDiscount);
  }, [getSubtotal, rankDiscountPercent]);

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

  // tính phần trăm màu đỏ so với giá cũ
  const calculateDiscount = (old_price, newPrice) => {
    return Math.round(((old_price - newPrice) / old_price) * 100);
  };

  const handleRedirect = () => {
    navigate("/"); // Chuyển hướng đến Home
  };
  // số lượng sản phẩm trong giỏ hàng
  const handleUpdateQuantity = (id, newQuantity) => {
    console.log("update quantity", id, newQuantity);
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity); // Gọi hàm từ context
  };

  const removeItem = (id) => {
    removeFromCart(id);
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

  // khu vực lấy thông tin khuyến mãi
  const getDiscount = (promotion_code) => {
    // tìm trong ds khuyến mãi
    const promotion = promotions.filter(
      (item) => item.promotion_code === promotion_code
    );
    if (promotion.length > 0) {
      const percent = promotion[0].promotion_percent / 100;
      // số tiền giảm giá = tổng tiền giỏ hàng * phần trăm khuyến mãi
      const priceReduce = getCartTotal() * percent;
      setDiscount(priceReduce);
      localStorage.setItem("discount", priceReduce);
      localStorage.setItem("promotion_code", promotion_code);
      console.log("price reduce", priceReduce, percent, getCartTotal());
    } else {
      setDiscount(0);
      localStorage.setItem("discount", 0);
      localStorage.setItem("promotion_code", "");
    }
  };

  // k được áp dụng mã giảm giá và chiết khấu đồng thời
  const handleCheckout = async () => {
    setIsLoading(true);
    // Kiểm tra nếu cả mã giảm giá và chiết khấu hạng đại lý
    if (discount > 0 && rankDiscountAmount > 0) {
      alert(
        "Bạn không thể áp dụng cả mã giảm giá và chiết khấu hạng đại lý đồng thời. Vui lòng chọn một trong hai."
      );
      setIsLoading(false);
      return;
    } else {
      // Reset mã giảm giá
      setCouponCode("");
      setDiscount(0);
      setAppliedCoupon(null);
      localStorage.removeItem("promotion_code");
      localStorage.removeItem("discount");

      localStorage.setItem("finalOrderTotal", getTotal()); // lưu tổng tiền cuối cùng
      alert("Đang chuyển đến trang thanh toán...");
      navigate("/PayCheckout");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const vnp_ResponseCode = params.get("vnp_ResponseCode");

    if (vnp_ResponseCode && vnp_ResponseCode !== "00") {
      alert("Thanh toán bị hủy. Bạn đã quay lại giỏ hàng.");
    }
  }, [location]);

  if (cartItems.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingBag className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Giỏ hàng trống
            </h1>
            <p className="mb-8 text-gray-600">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm
              tuyệt vời của chúng tôi!
            </p>
            <Button
              size="lg"
              className="text-black bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                try {
                  console.log("Trở về trang chủ");
                  navigate("/"); // Chuyển hướng đến Home
                } catch (error) {
                  console.error("Lỗi khi chuyển hướng:", error);
                  alert("Đã xảy ra lỗi khi chuyển hướng. Vui lòng thử lại!"); // Hiển thị thông báo lỗi
                }
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    );
  }
  console.log("Current userInfo:", userInfo);
  console.log("Current agency:", agency);
  console.log(
    "Is admin_agency and agency exists?",
    userInfo.role?.role_name === "admin_agency" && agency
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng</h1>
            {/* số lượng trong giỏ hàng */}
            <p className="mt-1 text-gray-600">
              {getTotalItems()} sản phẩm trong giỏ hàng
            </p>
          </div>

          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tiếp tục mua sắm
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.product_name}
                        className="object-cover w-24 h-24 border border-gray-200 rounded-lg"
                      />
                      {/* nếu có giá cũ thì hiển thị badge giảm giá */}
                      {item.old_price && (
                        <Badge
                          variant="destructive"
                          className="absolute text-xs -top-2 -right-2"
                        >
                          -{calculateDiscount(item.old_price, item.price)}%
                        </Badge>
                      )}
                      {item.number_of_inventory === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                          <Badge variant="secondary" className="text-xs">
                            Hết hàng
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* thông tin sản phẩm */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 truncate">
                            {item.product_name}
                          </h3>
                          {/* <p className="text-sm text-gray-600">{item.brand}</p> */}
                        </div>
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product_id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-blue-600">
                          {formatPrice(item.price)}
                        </span>
                        {/* nếu giá cũ gạch ngang */}
                        {item.old_price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.old_price)}
                          </span>
                        )}
                        {/* <span className="text-xs text-gray-500">
                          /{item.unit}
                        </span> */}
                      </div>

                      {/* giam số lượng */}
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
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          {/* // Số lượng sản phẩm */}
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
                            className="w-16 h-8 text-center border-0 focus-visible:ring-0"
                          />

                          {/* nút tăng */}
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
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
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
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Star className="w-5 h-5 mr-2" />
                  Thông tin thành viên
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userInfo.role?.role_name === "admin_agency" && agency ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Hạng thành viên:
                        </span>
                        <Badge className="text-white bg-blue-500">
                          <Trophy className="w-3 h-3 mr-1" />
                          {agency.agency_rank_name || "0"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Chiết khấu hạng:
                        </span>
                        <span className="font-medium">
                          {agency.discount_percent}%
                        </span>
                      </div>

                      {/* Tên đại lý, Địa chỉ, Số điện thoại 
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Tên đại lý:</span>
                        <span className="font-medium">
                          {agency.agency_name} // Uncomment if Agency object is fetched and has this
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Địa chỉ:</span>
                        <span className="font-medium">{agency.address}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Số điện thoại:
                        </span>
                        <span className="font-medium">{agency.phone}</span>
                      </div>
                      */}
                    </>
                  ) : (
                    <div className="text-sm text-gray-600">
                      Bạn chưa là đại lý. Đăng ký để nhận ưu đãi!
                    </div>
                  )}

                  <Separator />

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() =>
                      navigate("/rank", {
                        state: { agencyRankId: agency?.agency_rank_id },
                      })
                    }
                    disabled={
                      userInfo.role?.role_name !== "admin_agency" || !agency
                    }
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Xem chi tiết hạng đại lý
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">
                    Tóm tắt đơn hàng
                  </h2>

                  <div className="mb-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span>{formatPrice(getSubtotal())}</span>
                    </div>
                    {/* Hiển thị chiết khấu theo rank nếu có */}
                    {rankDiscountAmount > 0 && (
                      <div className="flex justify-between text-blue-600">
                        <span>Chiết khấu đại lý ({rankDiscountPercent}%)</span>
                        <span>-{formatPrice(rankDiscountAmount)}</span>
                      </div>
                    )}
                    {/* Giảm giá khuyến mãi nếu có */}
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá khuyến mãi</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className="text-green-600">Miễn phí</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Coupon Code Input */}
                  <div
                    className={`mb-4 ${
                      userInfo.role?.role_name === "admin_agency"
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    <p className="mb-2 text-sm font-medium">Mã giảm giá</p>
                    <div className="flex space-x-2 ">
                      <Select
                        value={couponCode}
                        onValueChange={(value) => {
                          setCouponCode(value === "none" ? "" : value);
                          getDiscount(value);
                        }}
                        // ẩn SelectTrigger nếu là admin_agency
                        disabled={
                          isApplyingCoupon ||
                          appliedCoupon !== null ||
                          userInfo.role_name === "admin_agency"
                        }
                      >
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="Chọn mã giảm giá" />
                        </SelectTrigger>
                        <SelectContent className="w-[300px] max-h-[200px] overflow-y-auto">
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
                      {/*
                      <Input
                        placeholder="Nhập mã giảm giá"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={isApplyingCoupon || appliedCoupon !== null || userInfo.role_name === "admin_agency"}
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
                          <X className="w-4 h-4 mr-1 text-black" /> Hủy
                        </Button>
                      ) : (
                        <Button
                          onClick={applyCoupon}
                          disabled={isApplyingCoupon || !couponCode.trim() || userInfo.role_name === "admin_agency"}
                          className="bg-blue-600 shrink-0 hover:bg-blue-700 text-bl"
                        >
                          {isApplyingCoupon ? "..." : "Áp dụng"}
                        </Button>
                      )}
                      */}
                    </div>
                    {/*
                    {couponError && (
                      <Alert variant="destructive" className="py-2 mt-2">
                        <AlertDescription className="flex items-center text-xs">
                          <X className="w-3 h-3 mr-1" /> {couponError}
                        </AlertDescription>
                      </Alert>
                    )}

                    {appliedCoupon && (
                      <Alert className="py-2 mt-2 text-green-800 border-green-200 bg-green-50">
                        <AlertDescription className="flex items-center text-xs">
                          <Check className="w-3 h-3 mr-1" /> Đã áp dụng mã "
                          {appliedCoupon}"
                          {couponDiscount > 0 &&
                            ` - Giảm ${formatPrice(couponDiscount)}`}
                        </AlertDescription>
                      </Alert>
                    )}
                    */}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatPrice(getTotal())}
                    </span>
                  </div>

                  <Button
                    className="w-full text-black bg-blue-600 hover:bg-blue-700"
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
                    <p className="mt-2 text-sm text-center text-red-600">
                      Vui lòng xóa sản phẩm hết hàng để tiếp tục
                    </p>
                  )}

                  <div className="p-4 mt-4 rounded-lg bg-blue-50">
                    <h3 className="mb-2 font-medium text-blue-900">
                      Ưu đãi đặc biệt
                    </h3>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>
                        • Miễn phí vận chuyển cho đơn hàng khi mua tại đây
                      </li>
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
