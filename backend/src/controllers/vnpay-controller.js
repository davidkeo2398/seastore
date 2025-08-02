const { data } = require("autoprefixer");
const { vnpayService } = require("../services");
const { Order } = require("../Model/Index");

module.exports = {
  /**
   * B1: Client gọi API này để tạo URL thanh toán
   */
  createPayment: async (req, res) => {
    try {
      console.log("Creating payment URL with data:", req.body);

      const paymentUrl = vnpayService.createPaymentUrl(req);

      // Trả về URL cho client để redirect
      res
        .status(200)
        .json({ code: "00", message: "Success", data: paymentUrl });
    } catch (error) {
      console.error("Error creating payment URL:", error);
      res
        .status(500)
        .json({ code: "99", message: "Unknown error: " + error.message });
    }
  },

  /**
   * B2: VNPAY gọi về URL này sau khi người dùng thanh toán
   */
  handleVnpayReturn: async (req, res) => {
    try {
      // Lấy các tham số VNPAY trả về
      const vnp_Params = req.query;
      console.log("VNPAY Params:", req.query);
      console.log("VNPAY body:", req.body);
      // Gọi service để xử lý, xác thực và cập nhật DB
      const result = await vnpayService.handleVnpayReturn(vnp_Params);

      // Lấy orderId từ kết quả để sử dụng trong URL redirect
      const orderId = vnp_Params["vnp_TxnRef"];

      // TẠO URL REDIRECT SẠCH VỀ FRONTEND
      const frontendBaseUrl = "http://localhost:5173"; // Địa chỉ frontend của bạn
      console.log("Payment successful for order:", orderId);

      console.log("VNPAY Result:", result);   
      if (result.code === "00") {
        // Thanh toán thành công
        // Redirect về trang thành công với các tham số an toàn
        console.log("Payment successful for order:", orderId);
        await Order.update(
          { status: "completed" },
          { where: { order_code: orderId } }
        );
        const successUrl = `${frontendBaseUrl}/orderSuccess?orderId=${orderId}&message=${encodeURIComponent(
          result.message
        )}`;
        res.redirect(successUrl);
      } else {
        // Thanh toán thất bại
        // Redirect về trang thất bại với các tham số an toàn
        const failureUrl = `${frontendBaseUrl}/orderFailure?orderId=${orderId}&message=${encodeURIComponent(
          result.message
        )}&errorCode=${result.code}`;
        res.redirect(failureUrl);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      const failureUrl = `http://localhost:5173/orderFailure?message=Co+loi+xay+ra`;
      res.redirect(failureUrl);
    }
  },
};
