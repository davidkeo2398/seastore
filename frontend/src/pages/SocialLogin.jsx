import { useState } from "react";

export default function SocialLogin({ onSignUp }) {
  return (
    <div className="social-login flex flex-col items-center gap-2">
      <div className="flex gap-2 mb-2">
        <button className="social-button flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100">
          <img src="google.svg" alt="Google" className="social-icon w-5 h-5" />
          Google
        </button>
        <button className="social-button flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100">
          <img src="apple.svg" alt="Apple" className="social-icon w-5 h-5" />
          Apple
        </button>
      </div>
      <p className="text-sm mt-2">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          className="text-blue-600 underline hover:text-blue-800"
          onClick={onSignUp}
        >
          Đăng ký
        </button>
      </p>
    </div>
  );
}