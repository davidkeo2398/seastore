const { data } = require("autoprefixer");
const { vnpayService } = require("../services");

module.exports = {
  vnPayCreate: async (req, res) => {
    try {
      const result = vnpayService.vnPayCreate(req);
      console.log("result", result)
      return res.status(200).json({
        message: "chuyen sang trang giao dich thanh cong",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Giao dich that bai",
        data: null,
        error: error.message,
      });
    }
  },
};
