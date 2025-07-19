const { orderAdminService } = require("../../services");

// lấy lại service trả ra thông báo
module.exports = {
  getOrders: async (req, res) => {
    try {
      const result = await orderAdminService.getOrders();
      return res.status(200).json({
        message: "Get orders success",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get orders fail",
        data: [],
        error: error.message,
      });
    }
  },
  updateStatusOrderById: async (req, res) => {
    try {
      const result = await orderAdminService.updateStatusOrderById(
        req.body,
        req.params.order_id
      );
      return res.status(200).json({
        message: "Update status order by id success",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Update status order by id fail",
        data: [],
        error: error.message,
      });
    }
  },
};
