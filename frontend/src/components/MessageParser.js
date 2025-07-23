// src/components/MessageParser.js
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    // Kịch bản 1: Tìm kiếm sản phẩm
    if (lowerCaseMessage.includes("tìm") || lowerCaseMessage.includes("sản phẩm") || lowerCaseMessage.includes("mua")) {
      this.actionProvider.handleProductSearch(lowerCaseMessage);
    }

    // Kịch bản 2: Hỏi khuyến mãi
    else if (lowerCaseMessage.includes("khuyến mãi") || lowerCaseMessage.includes("giảm giá") || lowerCaseMessage.includes("coupon")) {
      this.actionProvider.handlePromotions();
    }

    // Kịch bản 3: Kiểm tra đơn hàng
    else if (lowerCaseMessage.includes("đơn hàng") || lowerCaseMessage.includes("kiểm tra")) {
      this.actionProvider.handleOrderStatus(lowerCaseMessage);
    }

    // Mặc định
    else {
      this.actionProvider.greet();
    }
  }
}

export default MessageParser;