import { useEffect, useState, useRef } from "react";
// import "../css/PaymentCheckout.css";
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
import "../css/PaymentCheckout.css";
// import { Checkbox } from "@/components/ui/checkbox";
import { SunIcon } from "@radix-ui/react-icons";
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
import LoginDialog from "./LoginDiaLog";
import { Textarea } from "@/components/ui/textarea";
import { TermsModal, PrivacyModal } from "./Modal";
import { Checkbox } from "@/components/ui/checkbox";
import "../css/PaymentCheckout.css";
import CartPage from "../pages/CartPage";
import { toast } from "sonner";

const paymentMethods = [
  {
    id: "VNPay",
    name: "Ví điện tử",
    description: " VNPay",
    icon: Smartphone,
    popular: true,
  },
  // {
  //   id: "bank-transfer",
  //   name: "Chuyển khoản ngân hàng",
  //   description: "Internet Banking, QR Code",
  //   icon: Building2,
  //   popular: false,
  // },
  {
    id: "cash",
    name: "Thanh toán khi nhận hàng",
    description: "Tiền mặt",
    icon: Truck,
    popular: false,
  },
];

export default function PayCheckout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [orderSummary, setOrderSummary] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("VNPay");
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

    note: "",

    // Preferences
    saveInfo: false,
    agreeTerms: false,
  });
  const { cart, getCartTotal, removeFromCart } = useCart();

  // validation
  const [invalidFullName, setInvalidFullName] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPhone, setInvalidPhone] = useState(true);
  const [invalidAddress, setInvalidAddress] = useState(true);
  const [touchedFullName, setTouchedFullName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPhone, setTouchedPhone] = useState(false);
  const [touchedAddress, setTouchedAddress] = useState(false);

  // khuyến mãi
  const [discount, setDiscount] = useState(0);
  const [calRankDiscount, setCalRankDiscount] = useState(0);

  const [showSuccess, setShowSuccess] = useState(false);
  const timeoutRef = useRef(null);
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  useEffect(() => {
    setDiscount(localStorage.getItem("discount"));
    setCalRankDiscount(localStorage.getItem("calRankDiscount"));
    setOrderSummary(JSON.parse(localStorage.getItem("cart")));
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

  const checkInvalid = (fieldName, value) => {
    const validators = {
      full_name: {
        regex: /^[\p{L}\s]+$/u,
        setInvalid: setInvalidFullName,
      },
      user_email: {
        regex: /^[a-zA-Z0-9]([a-zA-Z0-9._-])*[a-zA-Z0-9]@gmail\.com$/,
        setInvalid: setInvalidEmail,
      },
      phone_user: {
        regex: /^0\d{9,10}$/,
        setInvalid: setInvalidPhone,
      },
      address_user: {
        regex: /^[a-zA-ZÀ-ỹ0-9\s,./\-]+$/,
        setInvalid: setInvalidAddress,
      },
    };

    const validator = validators[fieldName];
    if (validator) {
      const isValid = validator.regex.test(value.trim());
      validator.setInvalid(!isValid);
      return isValid;
    }
  };

  // const checkInvalid = async (fieldName, value) => {
  //   const regexFullName = /^[\p{L}\s]+$/u;
  //   const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const regexPhone = /^0\d{9,10}$/;
  //   const regexAddress = /^[a-zA-ZÀ-ỹ0-9\s,./\-]+$/;

  //   switch (fieldName) {
  //     case "full_name":
  //       return regexFullName.test(value.trim())
  //         ? setInvalidFullName(false)
  //         : setInvalidFullName(true);
  //       break;
  //     case "user_email":
  //       return regexEmail.test(value.trim())
  //         ? setInvalidEmail(false)
  //         : setInvalidEmail(true);
  //       break;
  //     case "phone_user":
  //       return regexPhone.test(value.trim())
  //         ? setInvalidPhone(false)
  //         : setInvalidPhone(true);
  //       break;
  //     case "address_user":
  //       return regexAddress.test(value.trim())
  //         ? setInvalidAddress(false)
  //         : setInvalidAddress(true);
  //       break;
  //     default:
  //       return;
  //       break;
  //   }
  // };

  // const handleCreateOrder = async () => {
  //   const response = await axiosInstance.post("/order", payload);
  //   if (response.status === 200) {
  //     const createdOrder = response.data.data;
  //     navigate("/orderTracking", { state: { order: createdOrder } });
  //   }
  // };

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
    checkInvalid(field, value); // Kiểm tra điều kiện ngay khi thay đổi
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
    if (isProcessing) return; // Ngăn chặn gửi nhiều lần
    if (!userInfo || !userInfo.role) {
      toast.error("Vui lòng đăng nhập để thanh toán");
      setIsShowLoginDialog(true);
      // navigate("/login");
      return;
    }
    if (!formData.agreeTerms) {
      toast.error("Vui lòng đồng ý với điều khoản và điều kiện");
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

    let finalTotal = getCartTotal();
    let promotionId = null;
    const promotion_code = localStorage.getItem("promotion_code");

    // Nếu có promotion_code thì lấy promotionId từ backend hoặc localStorage, nếu không thì để null
    if (promotion_code) {
      // Nếu bạn lưu promotion_id trong localStorage thì lấy ra, nếu không thì cần fetch từ backend
      promotionId = Number(localStorage.getItem("promotion_id")) || null;
    }

    if (userInfo.role?.role_name === "user") {
      finalTotal = getCartTotal() - discount;
    } else if (userInfo.role && userInfo.role.role_name === "admin_agency") {
      finalTotal = getCartTotal() - calRankDiscount;
    }
    const payload = {
      user_email:
        userInfo.email ||
        userInfo.user_email ||
        userInfo.user?.email ||
        userInfo.user?.user_email ||
        "",
      address_agency: formData.address_user,
      agency_name: formData.full_name,
      phone_agency: formData.phone_user,
      total: finalTotal,
      promotion_id: promotionId,
      order_date: getCurrentDateTime(),
      payment_method: selectedPayment.toLowerCase(),
      products: products,
      promotion_code: promotion_code,
      note: formData.note || "",
    };
    console.log("payload", payload);

    console.log("promotion_code lấy từ localStorage:", promotion_code);

    const result = await axiosInstance.post("/order", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("create order result", result);

    if (result.data.success) {
      // console.log("Order created successfully:", result.data);
    } else {
      console.error("Order creation failed:", result.data.message);
      toast.error(
        result.data.message || "Đặt hàng thất bại. Vui lòng thử lại."
      );
    }
    console.log("create order for other roles", result);
    removeFromCart();
    localStorage.removeItem("cart");
    if (selectedPayment === "VNPay") {
      // Hiển thị loading để người dùng biết hệ thống đang xử lý
      setIsProcessing(true);

      try {
         const payloadVNPay = {
          order_id: result.data.data.order.order_code, 
          amount: finalTotal, // Đảm bảo tên trường khớp với backend (amount)
          bankCode: "NCB", // bankCode thay vì bankName
          orderDescription: `Thanh toan don hang cho ${result.data.data.order.order_id}`, // Mô tả đơn hàng
          // order_id sẽ được tạo ở backend, không cần gửi lên
        };


        const response = await axiosInstance.post(
          "/vnpay/create_payment_url", // API endpoint backend
          payloadVNPay
        );

        // Chuyển hướng người dùng đến URL thanh toán của VNPAY
        if (response.data && response.data.data) {
          window.location.href = response.data.data;
        } else {
          // Xử lý nếu không nhận được URL
          toast.error("Không thể tạo yêu cầu thanh toán. Vui lòng thử lại.");
          setIsProcessing(false);
        }
        // !!! KHÔNG hiển thị toast.success hay setIsProcessing(false) ở đây
      } catch (error) {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
        setIsProcessing(false);
      }
    } else {
      navigate("/orderTracking");
      
    }
    localStorage.setItem("order", JSON.stringify(result.data.data.order));
    
    toast.success("Đặt hàng thành công!");
    setIsProcessing(false);
  };

  //   if (userInfo.role && userInfo.role.role_name === "admin_agency" || userInfo.role?.role_name === "user") {
  //     const payload = {
  //       user_email: userInfo.user.email,
  //       address_agency: formData.address_user,
  //       agency_name: formData.full_name,
  //       phone_agency: formData.phone_user,
  //       total: getCartTotal(),
  //       // - discount - calRankDiscount,
  //       promotion_id: null,
  //       order_date: getCurrentDateTime(),
  //       payment_method: "cash",
  //       products: products,
  //       promotion_code: localStorage.getItem('promotion_code')
  //     };
  //     console.log("payload", payload);
  //     // setIsProcessing(true);
  //     const result = await axiosInstance.post("/order", payload, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("create order for other roles", result);
  //     removeFromCart();
  //     navigate('/orderTracking');
  //     // alert("Thanh toán thành công!");
  //     // setIsProcessing(false);
  //   }
  // };
  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    console.log("User logged in:", userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setShowLoginDialog(false);
  };

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "credit-card":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                {/* <Label htmlFor="cardNumber">Số thẻ</Label> */}
                {/* <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  maxLength={19}
                /> */}
              </div>
              <div>
                {/* <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange("expiryDate", e.target.value)
                  }
                  maxLength={5}
                /> */}
              </div>
              <div>
                {/* <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  maxLength={4}
                /> */}
              </div>
              <div className="col-span-2">
                {/* <Label htmlFor="cardName">Tên trên thẻ</Label>
                <Input
                  id="cardName"
                  placeholder="NGUYEN VAN A"
                  value={formData.cardName}
                  onChange={(e) =>
                    handleInputChange("cardName", e.target.value)
                  }
                /> */}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {/* <Shield className="w-4 h-4" /> */}
              {/* <span>Thông tin thẻ được mã hóa SSL 256-bit</span> */}
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
                {/* <SelectTrigger>
                  <SelectValue placeholder="Chọn ví điện tử" />
                </SelectTrigger> */}
                <SelectContent>
                  {/* <SelectItem value="momo">MoMo</SelectItem> */}
                  {/* <SelectItem value="zalopay">ZaloPay</SelectItem>
                  <SelectItem value="viettelpay">ViettelPay</SelectItem> */}
                  <SelectItem value="vnpay">VNPay</SelectItem>
                  <SelectItem value="cod">Tiền mặt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div>
              <Label htmlFor="eWalletPhone">Số điện thoại</Label>
              <Input
                id="eWalletPhone"
                placeholder="0123456789"
                value={formData.eWalletPhone}
                onChange={(e) =>
                  handleInputChange("eWalletPhone", e.target.value)
                }
              />
            </div> */}
            <div className="p-4 rounded-lg bg-blue-50">
              <p className="text-sm text-blue-800">
                Bạn sẽ được chuyển đến ứng dụng ví điện tử để hoàn tất thanh
                toán
              </p>
            </div>
          </div>
        );

      case "cod":
        return (
          <div className="space-y-4">
            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-start space-x-2">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="mb-1 font-medium">Thanh toán khi nhận hàng</p>
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
    <div className="container px-4 py-8 mx-auto">
      {isShowLoginDialog && (
        <LoginDialog
          onClose={() => setIsShowLoginDialog(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
            <p className="mt-1 text-gray-600">Hoàn tất đơn hàng của bạn</p>
          </div>
          <Link to="/cart">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2 " />
              Quay lại giỏ hàng
            </Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Payment Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm text-white bg-blue-600 rounded-full">
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

                    {/* viết hàm ghi chú
                    <div className="col-span-2">
                      <Label htmlFor="note">Ghi chú</Label>
                      <Textarea
                        id="note"
                        value={formData.note}
                        onChange={(e) =>
                          handleInputChange("note", e.target.value)
                        }
                      />
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm text-white bg-blue-600 rounded-full">
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
                        className="flex items-center p-4 space-x-3 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex items-center flex-1 space-x-3">
                          <method.icon className="w-6 h-6 text-gray-600" />
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
                    {/* Lưu thông tin */}
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full ${
                          formData.saveInfo
                            ? "bg-black text-white"
                            : "border-gray-600 border-2"
                        }`}
                        onClick={() =>
                          handleInputChange("saveInfo", !formData.saveInfo)
                        }
                      >
                        {formData.saveInfo && (
                          <span className="block w-3 h-3 bg-white rounded-full"></span>
                        )}
                      </div>
                      <Label htmlFor="saveInfo" className="text-sm">
                        Lưu thông tin để thanh toán nhanh hơn lần sau
                      </Label>
                    </div>

                    {/* Đồng ý điều khoản */}
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full ${
                          formData.agreeTerms
                            ? "bg-black text-white"
                            : "border-gray-600 border-2"
                        }`}
                        onClick={() =>
                          handleInputChange("agreeTerms", !formData.agreeTerms)
                        }
                      >
                        {formData.agreeTerms && (
                          <span className="block w-2 h-2 bg-white rounded-full"></span>
                        )}
                      </div>
                      <Label htmlFor="agreeTerms" className="text-sm">
                        Tôi đồng ý với{" "}
                        <span
                          className="text-blue-600 cursor-pointer hover:underline"
                          onClick={() => setIsTermsModalOpen(true)} // Mở modal Điều khoản
                        >
                          Điều khoản và Điều kiện
                        </span>{" "}
                        và{" "}
                        <span
                          className="text-blue-600 cursor-pointer hover:underline"
                          onClick={() => setIsPrivacyModalOpen(true)} // Mở modal Chính sách Bảo mật
                        >
                          Chính sách Bảo mật
                        </span>
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
                          className="object-cover w-12 h-12 border rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.product_name}
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
                      <span>
                        -{formatPrice(localStorage.getItem("discount") || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Chiết khấu</span>
                      <span>
                        -
                        {formatPrice(
                          localStorage.getItem("calRankDiscount") || 0
                        )}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatPrice(getCartTotal() - discount - calRankDiscount)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-black bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    disabled={isProcessing || !formData.agreeTerms}
                  >
                    {isProcessing ? (
                      "Đang xử lý..."
                    ) : (
                      <>
                        <p
                          className="mt-1 text-gray-600 cursor-pointer hover:underline"
                          // onClick={() => navigate("/orderTracking")}
                        >
                          Hoàn tất đơn hàng của bạn
                        </p>
                      </>
                    )}
                  </Button>

                  {/* <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Thanh toán an toàn và bảo mật</span>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      {/* Modals */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}
