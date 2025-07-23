// chatbot-controller.js
const chatbotService = require("../services/chatbot-service");

module.exports = {
  handleQuestion: async (req, res) => {
    try {
      const { question } = req.body; // Lấy câu hỏi từ FE
      console.log("Received question:", question);
      if (!question) {
        return res
          .status(400)
          .json({ message: "Câu hỏi không được để trống." });
      }

      // Gọi service để xử lý câu hỏi, truyền thêm các tham số cần thiết
      const answer = await chatbotService.getAnswer(question);

      return res.status(200).json({ answer });
    } catch (error) {
      console.error("Lỗi khi xử lý câu hỏi:", error);
      return res.status(500).json({
        answer: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    }
  },
};
