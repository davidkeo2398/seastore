import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/Chatbot.css"; // Đảm bảo bạn có tệp CSS này

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Xin chào! Tôi là trợ lý ảo của Sea Store. Tôi có thể giúp gì cho bạn?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Hàm để tự động cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
        console.log("Gửi câu hỏi đến backend:", input);
      const response = await axios.post("/chatbot", {
        question: input,
      });

          console.log("Phản hồi từ backend:", response.data);


      const botMessage = {
        sender: "bot",
        text: response.data.answer || "Xin lỗi, tôi không hiểu.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Lỗi khi gửi câu hỏi đến backend:", error);
      const errorMessage = {
        sender: "bot",
        text: "Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        {isOpen ? "❌" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot">
          <header className="chatbot-header">
            <h2>Sea Store Bot 🤖</h2>
          </header>
          <ul className="chatbot-messages">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                <p>{msg.text}</p>
              </li>
            ))}
            {isLoading && (
              <li className="chat-message bot-message">
                <p>...</p> {/* Hiệu ứng đang gõ */}
              </li>
            )}
            <div ref={messagesEndRef} />
          </ul>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;