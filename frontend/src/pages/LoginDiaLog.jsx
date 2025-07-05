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

export default function LoginDialog({ onClose, onLoginSuccess }) {
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

      if (data.data.accessToken) {
        // document.cookie = `token=${data.data.accessToken}; max-age=14400; path=/`;
        setAuthToken(data.data.accessToken);
        setUser({ user: data.data.user });
        onClose();
        onLoginSuccess(data.data.user);
        // navigate(data.data.user.isAdmin ? '/admin' : '/home');
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
    signInWithPopup(auth, provider)
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
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
            <p className="text-red-500 text-sm">{errorMessages}</p>
          )}
          <Button type="submit" className="w-full bg-slate-400 text-black">
            Đăng nhập
          </Button>
        </form>
        <div className="mt-4">
          <p className="text-center text-sm text-gray-500">
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
        <p className="mt-4 text-center text-sm">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
