// src/components/ActionProvider.js
import axios from 'axios'; // Cần cài đặt axios: npm install axios

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  // Chào hỏi
  greet() {
    const greetingMessage = this.createChatBotMessage("Xin chào! Bạn cần tôi giúp gì ạ?");
    this.updateChatbotState(greetingMessage);
  }

  // Xử lý tìm kiếm sản phẩm
  async handleProductSearch(message) {
    // Trích xuất từ khóa, ví dụ: "tìm men vi sinh" -> "men vi sinh"
    const keywords = message.replace('tìm', '').replace('sản phẩm', '').trim();
    if (keywords) {
        try {
            const response = await axios.get(`http://localhost:3000/api/chatbot/products?keyword=${keywords}`);
            const products = response.data.data;
            let reply;
            if (products.length > 0) {
                const productNames = products.map(p => p.product_name).join(', ');
                reply = this.createChatBotMessage(`Tôi tìm thấy các sản phẩm sau: ${productNames}. Bạn quan tâm sản phẩm nào?`);
            } else {
                reply = this.createChatBotMessage(`Xin lỗi, tôi không tìm thấy sản phẩm nào với từ khóa "${keywords}".`);
            }
            this.updateChatbotState(reply);
        } catch (error) {
            const errorMessage = this.createChatBotMessage("Rất xin lỗi, đã có lỗi xảy ra khi tìm kiếm sản phẩm.");
            this.updateChatbotState(errorMessage);
        }
    }
  }

  // Xử lý hỏi khuyến mãi
  async handlePromotions() {
     try {
        const response = await axios.get(`http://localhost:3000/api/chatbot/promotions`);
        const promotions = response.data.data;
        let reply;
        if (promotions.length > 0) {
            const promotionMessages = promotions.map(p => `${p.promotion_name} (${p.promotion_code}): ${p.description}`);
            reply = this.createChatBotMessage(<ul>{promotionMessages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>);
        } else {
            reply = this.createChatBotMessage("Xin lỗi, hiện tại không có chương trình khuyến mãi nào.");
        }
        this.updateChatbotState(reply);
    } catch (error) {
        const errorMessage = this.createChatBotMessage("Rất xin lỗi, đã có lỗi xảy ra khi lấy thông tin khuyến mãi.");
        this.updateChatbotState(errorMessage);
    }
  }

  // Xử lý kiểm tra đơn hàng
  handleOrderStatus(message) {
      const orderIdMatch = message.match(/\d+/); // Tìm số trong tin nhắn
      if (orderIdMatch) {
          const orderId = orderIdMatch[0];
          // **Lưu ý:** Cần có cơ chế lấy token xác thực của người dùng
          const token = "YOUR_AUTH_TOKEN"; // Thay thế bằng token thực tế
          axios.get(`http://localhost:3000/api/chatbot/order-status/${orderId}`, {
              headers: { 'Authorization': `Bearer ${token}` }
          })
          .then(response => {
              const { status, order_code } = response.data.data;
              const reply = this.createChatBotMessage(`Đơn hàng #${order_code} của bạn đang ở trạng thái: ${status}.`);
              this.updateChatbotState(reply);
          })
          .catch(error => {
              const errorMessage = this.createChatBotMessage(error.response.data.message || "Lỗi khi kiểm tra đơn hàng.");
              this.updateChatbotState(errorMessage);
          });
      } else {
          const reply = this.createChatBotMessage("Vui lòng cho tôi biết mã đơn hàng bạn muốn kiểm tra.");
          this.updateChatbotState(reply);
      }
  }


  // Hàm tiện ích để cập nhật trạng thái chat
  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;