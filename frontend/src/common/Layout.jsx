import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";

const Layout = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Thêm tin nhắn của người dùng vào danh sách tin nhắn
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputMessage },
    ]);

    // Xóa nội dung trong ô nhập
    setInputMessage("");

    // Giả lập phản hồi từ bot
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Cảm ơn bạn đã liên hệ! Tôi sẽ hỗ trợ bạn ngay." },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>
      <Footer />

      {/* Nút nổi Zalo và Chatbot */}
      <div className="fixed z-50 flex flex-col gap-4 bottom-6 right-6">
        {/* Nút Zalo */}
        <button
          onClick={() => window.open("https://zalo.me", "_blank")}
          className="flex items-center justify-center p-3 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600"
          style={{ width: 56, height: 56 }}
        >
          <img
            src="images/icons8-zalo-48.png"
            alt="Zalo"
            className="w-8 h-8"
          />
        </button>

        {/* Nút Chatbot */}
        <button
          onClick={toggleChatbot}
          className="flex items-center justify-center p-3 bg-green-500 rounded-full shadow-lg hover:bg-green-600"
          style={{ width: 56, height: 56 }}
        >
          <span className="text-lg text-white">🤖</span>
        </button>

        {/* Cửa sổ Chatbot */}
        {isChatbotOpen && (
          <div
            className="absolute right-0 bg-white rounded-lg shadow-lg bottom-20"
            style={{ width: 350 }}
          >
           
            <div className="p-3 overflow-y-auto max-h-96">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    msg.sender === "user"
                      ? "text-right text-blue-500"
                      : "text-left text-gray-700"
                  }`}
                >
                  <p
                    className={`inline-block p-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-100"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 border-t">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 text-black bg-green-500 rounded hover:bg-green-600"
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;