const express = require('express');
const router = express.Router();
const { chatbotController } = require('../controllers/index');

// POST /api/chatbot
router.post('/', chatbotController.handleChat);

module.exports = router;