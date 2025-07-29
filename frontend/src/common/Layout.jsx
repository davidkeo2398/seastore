import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "@/pages/Chatbot";
import { MessageCircle } from "lucide-react";
import axiosInstance from "@/lib/axios";
import "../css/Layout.css";

export default function Layout() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Chào bạn, tôi là trợ lý ảo của Sea Store. Tôi có thể giúp gì cho bạn?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = async (question) => {
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setIsLoading(true);

    try {
      // Send question to backend
      const response = await axiosInstance.post("/chatbot", { question });

      // Add bot's response to the chat
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.answer },
      ]);
    } catch (error) {
      console.error("Lỗi khi gửi câu hỏi đến backend:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow outlet-container">
        <Outlet />
      </main>
      <Footer />

      {/* Chatbot Floating Button and Window */}
      <div className="fixed z-50 bottom-5 right-5">
        {isChatbotOpen && (
          <Chatbot
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onClose={toggleChatbot} // Đóng chat khi nhấn nút
          />
        )}
        <button
          onClick={toggleChatbot} // Mở hoặc đóng chat
          className="p-4 mt-4 dow-lg boa nded-full boaxt-black border-3 bg-black-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Toggle Chatbot"
        >
          <img
            src="../../public/images/chat_ai.jpg" // Đường dẫn tới hình ảnh
            alt="Chatbot Icon"
            className="border-white rounded-full border-3 w-15 h-18" // Kích thước hình ảnh
          />
        </button>
      </div>
    </div>
  );
}
