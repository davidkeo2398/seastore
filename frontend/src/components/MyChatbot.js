// src/components/MyChatbot.js
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './chatbotConfig';
import MessageParser from './MessageParser'; // Cần tạo file này
import ActionProvider from './ActionProvider'; // Cần tạo file này

const MyChatbot = () => {
  return (
    <div className="my-chatbot-container">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default MyChatbot;