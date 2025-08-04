const { chatbotService } = require('../services/index');

module.exports = {
  // nhận câu hỏi từ frontend và trả về câu trả lời
  handleChat: async (req, res) => {
    try {
      const { question } = req.body;
      console.log("Dữ liệu nhận từ frontend:", question);

      if (!question) {
        return res.status(400).json({
          message: "Câu hỏi không được để trống.",
        });
      }

      const answer = await chatbotService.getGeminiResponse(question);
      console.log("Phản hồi trả về frontend:", answer);

      return res.status(200).json({
        message: "Lấy câu trả lời thành công.",
        answer: answer,
      });
    } catch (error) {
      console.error("Lỗi trong Chatbot Controller:", error);
      return res.status(500).json({
        message: "Đã có lỗi xảy ra từ máy chủ.",
        error: error.message,
      });
    }
  },
};