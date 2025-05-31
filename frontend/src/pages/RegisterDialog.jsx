import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/lib/axios';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function RegisterPage() {
  const [errorMessages, setErrorMessages] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMessages('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    // try {
    //   await axiosInstance.post('/signup', { name, username, email, password });
    //   setErrorMessages('');
    //   alert('Đăng ký thành công. Vui lòng đăng nhập.');
    //   navigate('/login');
    // } catch (error) {
    //   setErrorMessages(error.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký.');
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="name" name="name" type="text" placeholder="Tên của bạn" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="text" placeholder="Username của bạn" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Email của bạn" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" name="password" type="password" placeholder="Mật khẩu" required />
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
          {errorMessages && <p className="text-red-500 text-sm">{errorMessages}</p>}
          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
        </form>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={() => {
              window.location.href = 'http://localhost:3333/auth/google';
            }}
            onError={() => {
              setErrorMessages('Đăng ký bằng Google thất bại.');
            }}
          />
        </div>
        <p className="mt-4 text-center text-sm">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}