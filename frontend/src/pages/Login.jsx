import { useState } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";

export default function Login ({ onClose }) {
     const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const { data } = await axiosInstance.post("/login", { password, email });
      if (data.token) {
        document.cookie = `token=${data.token}; max-age=14400; path=/`;
        if (data.user.isAdmin) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/home';
        }
      }
      if (data.message) alert(data.message);
      onClose && onClose();
      window.location.reload();
    } catch (error) {
      setErrorMessages(error.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-2">Đăng nhập vào tài khoản của bạn</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email của bạn"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mật khẩu"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <p className="text-red-500">{errorMessages}</p>
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
}