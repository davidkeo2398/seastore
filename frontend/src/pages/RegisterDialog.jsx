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

  const handleOpenChange = (val) => {
    setOpen(val);
    if (!val && onClose) onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    // const name = form.name.value;
    const user_name = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const first_name = form.firstName?.value;
    const last_name = form.lastName?.value;
    const phone = form.phone.value || '';
    const address = form.address.value || '';

    if (password !== confirmPassword) {
      setErrorMessages("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const response = await axiosInstance.post('auth/register', {user_name, first_name, last_name, email, password, phone, address });
      console.log("Đăng ký thành công", response);
      setErrorMessages('');
      onClose();
    } catch (error) {
      setErrorMessages(error.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký.');
    }
  };

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
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              name="lastName"
              type="text"
              placeholder="Tên của bạn là..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Username của bạn là ..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email của bạn"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Số điện thoại của bạn là..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="Địa chỉ của bạn là..."
              required
            />
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
          <Link to="./LoginDialog.jsx" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
