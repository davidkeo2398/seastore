import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const MyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Nút mở/đóng modal */}
      <button
        onClick={toggleModal}
        className="fixed p-3 text-white bg-blue-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-600"
        style={{ width: 56, height: 56 }}
      >
        {isOpen ? "❌" : "💬"}
      </button>

      {/* Modal Chatbot */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleModal}
        >
          <div
            className="p-4 bg-white rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Ngăn chặn đóng modal khi nhấn vào bên trong
          >
            <header className="flex items-center justify-between pb-2 mb-4 border-b">
              <h2 className="text-lg font-bold">Sea Store Bot 🤖</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </header>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyChatbot;