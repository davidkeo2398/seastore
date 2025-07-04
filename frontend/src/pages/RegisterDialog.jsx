import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function RegisterPage({ onClose }) {
  const [errorMessages, setErrorMessages] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(!!onClose);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // Regex để kiểm tra tên (chỉ chữ cái và khoảng trắng)
  const regexName = /^[\p{L}\s]+$/u;
  // Regex để kiểm tra email
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // Regex để kiểm tra số điện thoại (10 chữ số)
  const regexPhone = /^\d{10}$/;

  const validate = (field, value) => {
    switch (field) {
      case "firstName":
      case "lastName":
        return regexName.test(value)
          ? ""
          : "Tên chỉ được chứa chữ cái và khoảng trắng.";

      case "email":
        if (!value) return "Email là bắt buộc.";
        return regexEmail.test(value) ? "" : "Email không hợp lệ.";
      case "password":
        if (!value) return "Mật khẩu là bắt buộc.";
        return value.length >= 6 ? "" : "Mật khẩu phải có ít nhất 6 ký tự.";
      case "confirmPassword":
        if (!value) return "Vui lòng xác nhận mật khẩu.";
        return value === form.password ? "" : "Mật khẩu không khớp.";
      case "phone":
        if (!value) return "Số điện thoại là bắt buộc.";
        return regexPhone.test(value)
          ? ""
          : "Số điện thoại không hợp lệ (gồm 10 chữ số).";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
    setErrorMessages("");
    // Nếu trường hiện tại là `password`, kiểm tra lại cả `confirmPassword`
    if (name === "password") {
      newErrors.confirmPassword = validate(
        "confirmPassword",
        newForm.confirmPassword,
        newForm
      );
    }
  };

  const handleOpenChange = (val) => {
    setOpen(val);
    if (!val && onClose) onClose();
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Cập nhật lỗi cho trường vừa rời đi
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  // Hàm xử lý khi nhấn nút Đăng ký
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    let formIsValid = true;

    // Kiểm tra lỗi của tất cả các trường trước khi submit
    Object.keys(form).forEach((key) => {
      const error = validate(key, form[key]);
      if (error) {
        newErrors[key] = error;
        formIsValid = false;
      }
    });

    // if (password !== confirmPassword) {
    //   setErrorMessages("Mật khẩu và xác nhận mật khẩu không khớp.");
    //   return;
    // }

    setErrors(newErrors);

    // Nếu form không hợp lệ, dừng lại
    if (!formIsValid) {
      return;
    }

    try {
      await axiosInstance.post("auth/register", {
        user_name: form.username,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      });
      console.log("Đăng ký thành công");
      if (onClose) onClose();
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký."
      );
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.target;
  //   // const name = form.name.value;
  //   const user_name = form.username.value;
  //   const email = form.email.value;
  //   const password = form.password.value;
  //   const confirmPassword = form.confirmPassword.value;
  //   const first_name = form.firstName?.value;
  //   const last_name = form.lastName?.value;
  //   const phone = form.phone.value || "";
  //   const address = form.address.value || "";

  //   if (password !== confirmPassword) {
  //     setErrorMessages("Mật khẩu và xác nhận mật khẩu không khớp.");
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.post("auth/register", {
  //       user_name,
  //       first_name,
  //       last_name,
  //       email,
  //       password,
  //       phone,
  //       address,
  //     });
  //     console.log("Đăng ký thành công", response);
  //     setErrorMessages("");
  //     onClose();
  //   } catch (error) {
  //     setErrorMessages(
  //       error.response?.data?.message || "Đã xảy ra lỗi khi đăng ký."
  //     );
  //   }
  // };

  return (
    <Dialog
      open={onClose ? open : undefined}
      onOpenChange={onClose ? handleOpenChange : undefined}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đăng ký</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="name">Họ</Label>
            <Input
              id="name"
              name="firstName"
              type="text"
              placeholder="Họ của bạn là..."
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              name="lastName"
              type="text"
              placeholder="Tên của bạn là..."
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Bạn muốn tên đăng nhập là gì..."
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email của bạn"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Số điện thoại của bạn là..."
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Địa chỉ của bạn là..."
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          {errorMessages && (
            <p className="text-red-500 text-sm">{errorMessages}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-black py-2 rounded"
          >
            Đăng ký
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Link
            to="./LoginDialog.jsx"
            className="text-blue-500 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
