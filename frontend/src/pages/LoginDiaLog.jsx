import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import {AuthContext} from "@/context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { icons } from "lucide-react";

export default function LoginDialog() {

  const [errorMessages, setErrorMessages] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // try {
    //   const { data } = await axiosInstance.post('/login', { email, password });

    //   if (data.token) {
    //     document.cookie = `token=${data.token}; max-age=14400; path=/`;
    //     setUser({ iduser: data.user.iduser, isAdmin: data.user.isAdmin });
    //     navigate(data.user.isAdmin ? '/admin' : '/home');
    //   } else {
    //     setErrorMessages(data.message);
    //   }
    // } catch (error) {
    //   setErrorMessages(error.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập.');
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {errorMessages && <p className="text-red-500 text-sm">{errorMessages}</p>}
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>
        <div className="mt-4">
          <p className="text-center text-sm text-gray-500">Hoặc đăng nhập bằng</p>
          <Button className={icons.google}> </Button>
          {/* <GoogleLogin
            onSuccess={() => {
              window.location.href = 'http://localhost:3333/auth/google';
            }}
            onError={() => {
              setErrorMessages('Đăng nhập bằng Google thất bại.');
            }}
          /> */}
        </div>
        <p className="mt-4 text-center text-sm">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
