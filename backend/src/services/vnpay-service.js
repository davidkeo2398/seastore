const { vnpayCreate } = require("../utils/vnpay");

module.exports = {
  vnPayCreate: (req) => {
    try {
      let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      const vnpUrl = vnpayCreate(req.body, ipAddr);
      return vnpUrl;
    } catch (error) {
      throw new Error("Thanh toan vnpay that bai: ", error);
    }
  },
};
