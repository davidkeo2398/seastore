const { Order } = require("../Model/Index");
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
      if(vnpUrl !== "" || vnpUrl !== undefined || vnpUrl !== null){
        Order.update({status: "completed"},{where: {order_id: req.body.order_id}});
      }
      return vnpUrl;
    } catch (error) {
      throw new Error("Thanh toan vnpay that bai: ", error);
    }
  },
};
