import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react"; // Import icon X để đóng chat
import ReactMarkdown from "react-markdown";

export default function Chatbot({
  messages,
  onSendMessage,
  isLoading,
  onClose,
}) {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputRef.current.value.trim()) {
        onSendMessage(inputRef.current.value);
        inputRef.current.value = "";
      }
    }
  };

  const handleSendClick = () => {
    if (inputRef.current.value.trim()) {
      onSendMessage(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[350px] bg-white rounded-lg shadow-xl border relative">
      <div className="flex items-center p-4 text-white bg-blue-600 rounded-t-lg">
        <span className="w-6 h-6 mr-3 text-black">🤖</span>
        <h2 className="flex-1 text-lg font-semibold">Sea Store Assistant</h2>
        {/* Icon để đóng chat */}
        <button
          onClick={onClose} // Gọi hàm onClose để đóng chat
          className="text-blue-600 hover:text-gray-300 focus:outline-none"
          aria-label="Close Chat"
        >
          <span className="text-xl font-bold text-black"> -</span>
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto text-gray-800 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {/* SỬ DỤNG ReactMarkdown ĐỂ HIỂN THỊ TIN NHẮN */}
              <ReactMarkdown
                components={{
                  // Mở link trong tab mới
                  a: ({ node, ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg">
              <span className="inline-block w-2 h-2 mr-1 bg-gray-500 rounded-full animate-pulse"></span>
              <span className="inline-block w-2 h-2 mr-1 delay-75 bg-gray-500 rounded-full animate-pulse"></span>
              <span className="inline-block w-2 h-2 delay-150 bg-gray-500 rounded-full animate-pulse"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-4 bg-white border-t rounded-b-lg">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendClick}
          className="p-4 mt-4 text-black rounded-full shadow-lg bg-black-600 hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500"
          disabled={isLoading}
        >
          <Send className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
}
