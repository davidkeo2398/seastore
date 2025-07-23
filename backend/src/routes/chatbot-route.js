// src/routes/chatbot-route.js

const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbot-controller");

// Route để xử lý câu hỏi từ frontend
router.post("/chatbot", chatbotController.handleQuestion);

module.exports = router;