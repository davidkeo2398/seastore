// src/services/chatbot-service.js
const { Op } = require("sequelize");
const {
  Product,
  Order,
  Promotion,
  Agency,
  AgencyRank,
} = require("../Model/Index");
const { format } = require("date-fns");

// --- Logic chính của Chatbot Service, kết nối với CSDL thật ---

module.exports = {
  getAnswer: async (question) => {
    const lowerCaseQuestion = question.toLowerCase().trim();

    // --- Kịch bản 1: Hỏi về sản phẩm ---
    if (
      lowerCaseQuestion.includes("sản phẩm") ||
      lowerCaseQuestion.includes("tìm") ||
      lowerCaseQuestion.includes("mua") ||
      lowerCaseQuestion.includes("có bán")
    ) {
      const keyword = lowerCaseQuestion
        .replace(/sản phẩm|tìm|mua|có bán/g, "")
        .trim();

      if (keyword) {
        const products = await Product.findAll({
          where: {
            product_name: {
              [Op.like]: `%${keyword}%`,
            },
          },
          limit: 5, // Giới hạn 5 sản phẩm để câu trả lời không quá dài
        });

        if (products.length > 0) {
          const productList = products
            .map(
              (p) =>
                `- ${p.product_name} - giá ${Number(
                  p.price
                ).toLocaleString("vi-VN")}đ`
            )
            .join("\n");
          return `Tôi đã tìm thấy các sản phẩm sau khớp với từ khóa "${keyword}":\n${productList}`;
        } else {
          return `Rất tiếc, tôi không tìm thấy sản phẩm nào có tên chứa "${keyword}". Bạn vui lòng thử lại với từ khóa khác nhé.`;
        }
      }
      return "Bạn muốn tìm sản phẩm cụ thể nào? Vui lòng cho tôi biết tên sản phẩm nhé.";
    }

    // --- Kịch bản 2: Hỏi về khuyến mãi ---
    if (
      lowerCaseQuestion.includes("khuyến mãi") ||
      lowerCaseQuestion.includes("giảm giá") ||
      lowerCaseQuestion.includes("coupon")
    ) {
      const promotions = await Promotion.findAll({
        where: {
          promotion_expired_date: {
            [Op.gt]: new Date(), // Chỉ lấy khuyến mãi còn hạn
          },
        },
      });

      if (promotions.length > 0) {
        const promotionList = promotions
          .map(
            (p) =>
              `- ${
                p.description
              } (Mã: ${p.promotion_code}), hết hạn ngày ${format(
                new Date(p.promotion_expired_date),
                "dd/MM/yyyy"
              )}`
          )
          .join("\n");
        return `Hiện tại cửa hàng đang có các chương trình khuyến mãi sau:\n${promotionList}`;
      }
      return "Rất tiếc, hiện tại cửa hàng chưa có chương trình khuyến mãi nào đang diễn ra.";
    }

    // --- Kịch bản 3: Kiểm tra trạng thái đơn hàng ---
    if (
      lowerCaseQuestion.includes("đơn hàng") ||
      lowerCaseQuestion.includes("trạng thái") ||
      lowerCaseQuestion.includes("tình trạng")
    ) {
      // Sử dụng regex để tìm mã đơn hàng trong câu hỏi (giả sử mã có cả chữ và số, dài từ 5 ký tự trở lên)
      const orderCodeMatch = lowerCaseQuestion.match(/([a-zA-Z0-9]{5,})/);
      if (orderCodeMatch) {
        const orderCode = orderCodeMatch[0];
        const order = await Order.findOne({
          where: { order_code: orderCode },
        });

        if (order) {
          const formattedDate = format(
            new Date(order.order_date),
            "dd/MM/yyyy HH:mm"
          );
          return `Đơn hàng có mã #${order.order_code} (đặt ngày ${formattedDate}) của bạn hiện đang ở trạng thái: ${order.status}.`;
        } else {
          return `Tôi không tìm thấy thông tin cho đơn hàng có mã "${orderCode}". Bạn vui lòng kiểm tra lại mã đơn hàng nhé.`;
        }
      }
      return "Để kiểm tra đơn hàng, bạn vui lòng cung cấp mã đơn hàng nhé.";
    }

    // --- Kịch bản 4: Chào hỏi & Cảm ơn ---
    if (
      lowerCaseQuestion.startsWith("chào") ||
      lowerCaseQuestion.startsWith("hello")
    ) {
      return "Chào bạn, tôi là trợ lý ảo của Sea Store. Tôi có thể giúp gì cho bạn về sản phẩm, khuyến mãi hoặc đơn hàng?";
    }
    if (
      lowerCaseQuestion.includes("cảm ơn") ||
      lowerCaseQuestion.includes("thank you")
    ) {
      return "Rất vui khi được hỗ trợ bạn!";
    }

    // --- Câu trả lời mặc định khi không hiểu ---
    return "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Tôi có thể giúp bạn tìm kiếm sản phẩm, tra cứu khuyến mãi hoặc kiểm tra tình trạng đơn hàng.";
  },
};