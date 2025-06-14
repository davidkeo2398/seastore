import { useEffect, useState } from "react";
import "../css/PaymentCheckout.css";
import {
  CreditCard,
  Smartphone,
  Building2,
  Truck,
  Shield,
  ArrowLeft,
  Lock,
  AlertCircle,
  Regex,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import axiosInstance from "@/lib/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Mock order data
// const orderSummary = {
//   items: [
//     {
//       id: "1",
//       name: "Premium Wireless Headphones",
//       quantity: 2,
//       price: 2500000,
//       image: "/placeholder.svg?height=60&width=60",
//     },
//     {
//       id: "2",
//       name: "Bluetooth Speaker Pro",
//       quantity: 1,
//       price: 1800000,
//       image: "/placeholder.svg?height=60&width=60",
//     },
//   ],
//   subtotal: 6800000,
//   shipping: 0,
//   discount: 500000,
//   total: 6300000,
// };

const paymentMethods = [
  {
    id: "credit-card",
    name: "Thẻ tín dụng/Ghi nợ",
    description: "Visa, Mastercard, JCB",
    icon: CreditCard,
    popular: true,
  },
  {
    id: "e-wallet",
    name: "Ví điện tử",
    description: "MoMo, ZaloPay, ViettelPay",
    icon: Smartphone,
    popular: true,
  },
  {
    id: "bank-transfer",
    name: "Chuyển khoản ngân hàng",
    description: "Internet Banking, QR Code",
    icon: Building2,
    popular: false,
  },
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng",
    description: "Tiền mặt hoặc thẻ",
    icon: Truck,
    popular: false,
  },
];

export default function PayCheckout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [orderSummary, setOrderSummary] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    // Billing info
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",

    // Card info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // E-wallet
    eWalletType: "",
    eWalletPhone: "",

    // Bank transfer
    bankCode: "",

    // Preferences
    saveInfo: false,
    agreeTerms: false,
  });
  const { cart, getCartTotal, removeFromCart } = useCart();
  const [invalidFullName, setInvalidFullName] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPhone, setInvalidPhone] = useState(true);
  const [invalidAddress, setInvalidAddress] = useState(true);

  const [touchedFullName, setTouchedFullName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const [touchedAddress, setTouchedAddress] = useState(false);

  useEffect(() => {
    setOrderSummary(cart);
  }, []);
  const [paycheck, setPaycheck] = useState([]);
  useEffect(() => {
    fetchUserInfo();
    fetchPaycheck();
    // console.log('debug cart', cart, getCartTotal())
  }, []);
  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/auth/userInfo");
      const data = response.data?.data;
      if (data && data.role) {
        setUserInfo(data);
      } else {
        setUserInfo({});
        console.warn("User info không có trường role:", data);
      }
    } catch (error) {
      setUserInfo({});
      console.error("Lỗi khi fetch user info:", error);
    }
  };

  const checkInvalid = async (fieldName, value) => {
    const regexFullName = /^[\p{L}\s]+$/u;
    const regexEmail = /\b@\w+\.{1}com\.{1}w+/;
    const regexPhone = /^0\d{9,10}$/;
    const regexAddress = /^[a-zA-ZÀ-ỹ0-9\s,./\-]+$/;
    switch (fieldName) {
      case "full_name":
        return regexFullName.test(value.trim())
          ? setInvalidFullName(false)
          : setInvalidFullName(true);
        break;
      case "user_email":
        return regexEmail.test(value.trim())
          ? setInvalidEmail(false)
          : setInvalidEmail(true);
        break;
      case "phone_user":
        return regexPhone.test(value.trim())
          ? setInvalidPhone(false)
          : setInvalidPhone(true);
        break;
      case "address_user":
        return regexAddress.test(value.trim())
          ? setInvalidAddress(false)
          : setInvalidAddress(true);
        break;
      default:
        return;
        break;
    }
  };

  const handleCreateOrder = async () => {
    const response = await axiosInstance.post("/order", payload);
    if (response.status === 200) {
      const createdOrder = response.data.data;
      navigate("/orderTracking", { state: { order: createdOrder } });
    }
  };

  const fetchPaycheck = async () => {
    try {
      const { data } = await axiosInstance.get("/order");
      setPaycheck(data.data);
      console.log("Paycheck fetched successfully", data.data);
      if (data.error) {
        console.error("Error fetching paycheck:", data.error);
      }
    } catch (error) {
      console.error("Error fetching paycheck:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    checkInvalid(field, value);
    console.log(`Updated ${field}:`, value);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    return (
      now.getFullYear() +
      "-" +
      pad(now.getMonth() + 1) +
      "-" +
      pad(now.getDate()) +
      " " +
      pad(now.getHours()) +
      ":" +
      pad(now.getMinutes()) +
      ":" +
      pad(now.getSeconds())
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("Vui lòng đồng ý với điều khoản và điều kiện");
      return;
    }

    console.log("form data", formData);
    console.log("userInfo", userInfo);
    console.log("cart", orderSummary);
    const products = orderSummary.map((item) => {
      return {
        product_id: item.product_id,
        quantity: item.quantity,
      };
    });
    console.log("products", products);

    if (userInfo.role && userInfo.role.role_name === "admin_agency") {
      const payload = {
        user_email: userInfo.user.email,
        address_agency: formData.address_user,
        agency_name: formData.full_name,
        phone_agency: formData.phone_user,
        total: getCartTotal(),
        promotion_id: 1,
        order_date: getCurrentDateTime(),
        payment_method: "cash",
        products: products,
      };
      console.log("payload", payload);
      // setIsProcessing(true);
      const result = await axiosInstance.post("/order", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("create order", result);
      removeFromCart();
      // alert("Thanh toán thành công!");
      // setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "credit-card":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="cardNumber">Số thẻ</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  maxLength={19}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange("expiryDate", e.target.value)
                  }
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  maxLength={4}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="cardName">Tên trên thẻ</Label>
                <Input
                  id="cardName"
                  placeholder="NGUYEN VAN A"
                  value={formData.cardName}
                  onChange={(e) =>
                    handleInputChange("cardName", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Thông tin thẻ được mã hóa SSL 256-bit</span>
            </div>
          </div>
        );

      case "e-wallet":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="eWalletType">Chọn ví điện tử</Label>
              <Select
                value={formData.eWalletType}
                onValueChange={(value) =>
                  handleInputChange("eWalletType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ví điện tử" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="momo">MoMo</SelectItem>
                  <SelectItem value="zalopay">ZaloPay</SelectItem>
                  <SelectItem value="viettelpay">ViettelPay</SelectItem>
                  <SelectItem value="vnpay">VNPay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="eWalletPhone">Số điện thoại</Label>
              <Input
                id="eWalletPhone"
                placeholder="0123456789"
                value={formData.eWalletPhone}
                onChange={(e) =>
                  handleInputChange("eWalletPhone", e.target.value)
                }
              />
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Bạn sẽ được chuyển đến ứng dụng ví điện tử để hoàn tất thanh
                toán
              </p>
            </div>
          </div>
        );

      case "bank-transfer":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankCode">Chọn ngân hàng</Label>
              <Select
                value={formData.bankCode}
                onValueChange={(value) => handleInputChange("bankCode", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngân hàng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vcb">Vietcombank</SelectItem>
                  <SelectItem value="tcb">Techcombank</SelectItem>
                  <SelectItem value="mb">MB Bank</SelectItem>
                  <SelectItem value="acb">ACB</SelectItem>
                  <SelectItem value="vib">VIB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Hướng dẫn chuyển khoản:</p>
                  <ul className="space-y-1">
                    <li>1. Chọn ngân hàng và tiến hành thanh toán</li>
                    <li>2. Sử dụng mã QR hoặc thông tin tài khoản</li>
                    <li>3. Đơn hàng sẽ được xử lý sau khi nhận được tiền</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case "cod":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium mb-1">Thanh toán khi nhận hàng</p>
                  <ul className="space-y-1">
                    <li>• Thanh toán bằng tiền mặt hoặc thẻ khi nhận hàng</li>
                    <li>• Kiểm tra sản phẩm trước khi thanh toán</li>
                    <li>• Phí COD: Miễn phí</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
            <p className="text-gray-600 mt-1">Hoàn tất đơn hàng của bạn</p>
          </div>
          <Link to="/cart">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại giỏ hàng
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      1
                    </span>
                    Thông tin thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Họ và tên *</Label>
                      <Input
                        id="full_name"
                        required
                        value={formData.full_name}
                        onClick={() => setTouchedFullName(false)}
                        onChange={(e) => {
                          handleInputChange("full_name", e.target.value);
                          setTouchedFullName(false);
                        }}
                        onBlur={() => setTouchedFullName(true)}
                      />
                      {invalidFullName && touchedFullName && (
                        <p className="mt-1 text-sm text-red-600">
                          Họ và tên không đúng định dạng
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone_user">Số điện thoại *</Label>
                      <Input
                        id="phone_user"
                        required
                        value={formData.phone_user}
                        onClick={() => setTouchedPhone(false)}
                        onChange={(e) => {
                          handleInputChange("phone_user", e.target.value);
                          setTouchedPhone(false);
                        }}
                        onBlur={() => setTouchedPhone(true)}
                      />
                      {invalidPhone && touchedPhone && (
                        <p className="mt-1 text-sm text-red-600">
                          Số điện thoại không đúng định dạng
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="user_email">Email *</Label>
                      <Input
                        id="user_email"
                        type="email"
                        required
                        value={formData.user_email}
                        onClick={() => setTouchedEmail(false)}
                        onChange={(e) => {
                          handleInputChange("user_email", e.target.value);
                          setTouchedEmail(false);
                        }}
                        onBlur={() => setTouchedEmail(true)}
                      />
                      {invalidEmail && touchedEmail && (
                        <p className="mt-1 text-sm text-red-600">
                          Email không đúng định dạng
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address_user">Địa chỉ *</Label>
                      <Input
                        id="address_user"
                        required
                        value={formData.address_user}
                        onClick={() => setTouchedAddress(false)}
                        onChange={(e) => {
                          handleInputChange("address_user", e.target.value);
                          setTouchedAddress(false);
                        }}
                        onBlur={() => setTouchedAddress(true)}
                      />
                      {invalidAddress && touchedAddress && (
                        <p className="mt-1 text-sm text-red-600">
                          Địa chỉ không đúng định dạng
                        </p>
                      )}
                    </div>
                    {/* <div>
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) =>
                          handleInputChange("city", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                          <SelectItem value="haiphong">Gia Lai</SelectItem>
                          <SelectItem value="cantho">Cần Thơ</SelectItem>
                          <SelectItem value="hue">Huế</SelectItem>
                          <SelectItem value="nhatrang">Nha Trang</SelectItem>
                          <SelectItem value="dalat">Đà Lạt</SelectItem>
                          <SelectItem value="vungtau">Vũng Tàu</SelectItem>
                          <SelectItem value="binhduong">Bình Dương</SelectItem>
                          <SelectItem value="dongnai">Đồng Nai</SelectItem>
                          <SelectItem value="quangninh">Quảng Ninh</SelectItem>
                          <SelectItem value="nghean">Nghệ An</SelectItem>
                          <SelectItem value="binhdinh">Bình Định</SelectItem>
                          <SelectItem value="phuyen">Phú Yên</SelectItem>
                          <SelectItem value="kiengiang">Kiên Giang</SelectItem>
                          <SelectItem value="angiang">An Giang</SelectItem>
                          <SelectItem value="lamdong">Lâm Đồng</SelectItem>
                          <SelectItem value="thanhhoa">Thanh Hóa</SelectItem>
                          <SelectItem value="thaibinh">Thái Bình</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    {/* <div>
                      <Label htmlFor="district">Quận/Huyện *</Label>
                      <Select
                        value={formData.district}
                        onValueChange={(value) =>
                          handleInputChange("district", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quận/huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="district1">Quận 1</SelectItem>
                          <SelectItem value="district2">Quận 2</SelectItem>
                          <SelectItem value="district3">Quận 3</SelectItem>
                          <SelectItem value="district4">Quận 4</SelectItem>
                          <SelectItem value="district5">Quận 5</SelectItem>
                          <SelectItem value="district6">Quận 6</SelectItem>
                          <SelectItem value="district7">Quận 7</SelectItem>
                          <SelectItem value="district8">Quận 8</SelectItem>
                          <SelectItem value="district9">Quận 9</SelectItem>
                          <SelectItem value="district10">Quận 10</SelectItem>
                          <SelectItem value="district11">Quận 11</SelectItem>
                          <SelectItem value="district12">Quận 12</SelectItem>
                          <SelectItem value="binhthanh">
                            Quận Bình Thạnh
                          </SelectItem>
                          <SelectItem value="govap">Quận Gò Vấp</SelectItem>
                          <SelectItem value="phunhuan">
                            Quận Phú Nhuận
                          </SelectItem>
                          <SelectItem value="tanbinh">Quận Tân Bình</SelectItem>
                          <SelectItem value="tanphu">Quận Tân Phú</SelectItem>
                          <SelectItem value="thuduc">TP. Thủ Đức</SelectItem>
                          <SelectItem value="binhtan">Quận Bình Tân</SelectItem>
                          <SelectItem value="hocmon">Huyện Hóc Môn</SelectItem>
                          <SelectItem value="binhchanh">
                            Huyện Bình Chánh
                          </SelectItem>
                          <SelectItem value="nhabe">Huyện Nhà Bè</SelectItem>
                          <SelectItem value="cuchi">Huyện Củ Chi</SelectItem>
                          <SelectItem value="canjo">Huyện Cần Giờ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      2
                    </span>
                    Phương thức thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                    className="space-y-4"
                  >
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex items-center space-x-3 flex-1">
                          <method.icon className="h-6 w-6 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <Label
                                htmlFor={method.id}
                                className="font-medium cursor-pointer"
                              >
                                {method.name}
                              </Label>
                              {method.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Phổ biến
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Payment Form */}
                  <div className="mt-6">{renderPaymentForm()}</div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={!!formData.saveInfo}
                        onCheckedChange={(checked) =>
                          handleInputChange("saveInfo", checked)
                        }
                      />
                      <Label htmlFor="saveInfo" className="text-sm">
                        Lưu thông tin để thanh toán nhanh hơn lần sau
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={!!formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          handleInputChange("agreeTerms", checked)
                        }
                        className={
                          formData.agreeTerms
                            ? "bg-white border-black text-black" // text-white để tick nổi bật trên nền đen
                            : "border-gray-300"
                        }
                      >
                        <Checkbox.Indicator className="text-black" />
                      </Checkbox>
                      <Label htmlFor="agreeTerms" className="text-sm">
                        Tôi đồng ý với{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Điều khoản và Điều kiện
                        </a>{" "}
                        và{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                          Chính sách Bảo mật
                        </a>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Đơn hàng của bạn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {orderSummary.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tạm tính</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phí vận chuyển</span>
                      <span className="text-green-600">Miễn phí</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Giảm giá</span>
                      <span>-{formatPrice(orderSummary?.discount || 0)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-black"
                    size="lg"
                    disabled={isProcessing || !formData.agreeTerms}
                  >
                    {isProcessing ? (
                      "Đang xử lý..."
                    ) : (
                      <>
                        <p
                          className="text-gray-600 mt-1 cursor-pointer hover:underline"
                          onClick={() => navigate("/orderTracking")}
                        >
                          Hoàn tất đơn hàng của bạn
                        </p>
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>Thanh toán an toàn và bảo mật</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}