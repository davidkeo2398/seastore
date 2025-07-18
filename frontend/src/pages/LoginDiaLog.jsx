import { useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import { AuthContext } from "@/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { icons } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import setAuthToken from "@/ultils/Authentication";

export default function LoginDialog({ onClose, onLoginSuccess, onShowRegister }) {
  const [errorMessages, setErrorMessages] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(!!onClose);

  const handleOpenChange = (val) => {
    setOpen(val);
    if (!val && onClose) onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { data } = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      console.log("Login response:", data.data.user);
// token trả về từ server
      if (data.data.accessToken) {
        // document.cookie = `token=${data.data.accessToken}; max-age=14400; path=/`;
        setAuthToken(data.data.accessToken); // lueu token vào sessionStorage
        setUser({ user: data.data.user }); // lưu thông tin người dùng vào context
        onClose();
        onLoginSuccess(data.data.user);
        location.reload();
      } else {
        setErrorMessages(data.message);
      }
    } catch (error) {
      setErrorMessages(
        error.response?.data?.message || "Đã xảy ra lỗi khi đăng nhập."
      );
    }
  };
  const handleGgLogin = () => {
    signInWithPopup(auth, provider) // sử dụng Firebase để đăng nhập bằng Google
      .then((result) => {
        console.log("Google login successful:", result);
        const user = result.user;
        setUser(user);
        setAuthToken(user.accessToken);
        return user;

        // setUser({ iduser: user.uid, isAdmin: false });
      })
      .then((user) => {
        onClose();
        onLoginSuccess(user);
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
        setErrorMessages("Đăng nhập bằng Google thất bại.");
      });
  };

  return (
    <Dialog
      open={onClose ? open : undefined}
      onOpenChange={onClose ? handleOpenChange : undefined}
    >
      {!onClose && (
        <DialogTrigger asChild>
          <Button variant="outline">Đăng nhập</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đăng nhập</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
          {errorMessages && (
            <p className="text-sm text-red-500">{errorMessages}</p>
          )}
          <Button type="submit" className="w-full text-black bg-slate-400">
            Đăng nhập
          </Button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-center text-gray-500">
            Hoặc đăng nhập bằng
          </p>
          <div className="flex justify-center mt-2">
            <button className="social-button" onClick={handleGgLogin}>
              <img
                src="/images/icons8-google-48.png"
                alt="Google"
                className="social-icon"
              />
              Google
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-center">
          Chưa có tài khoản?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              onShowRegister(); // Gọi hàm để hiển thị RegisterDialog
            }}
          >
            Đăng ký
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}