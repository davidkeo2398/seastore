const { orderAdminService, orderService } = require("../../services");

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

  getOrderDetails: async (req, res) => {
    try {
      const orderId = req.params.order_id;

      // Lấy thông tin đơn hàng
      const order = await orderAdminService.getOrderDetails(orderId);

      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }

      res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching admin order details:", error);
      res.status(500).json({ error: "Failed to fetch admin order details" });
    }
  },

  getTotalProductsByCategoryOnOrder: async (req, res) => {
    try {
      const { order_id } = req.params;
      console.log("order_id", order_id);
      const result = await orderAdminService.getTotalProductsByCategoryOnOrder(
        order_id
      );
      return res.status(200).json({
        message: "Total products by category fetched successfully",
        data: result,
      });
    } catch (error) {
      console.error("Error fetching total products by category:", error);
      return res.status(400).json({
        message: "Failed to fetch total products by category",
        data: [],
        error: error.message,
      });
    }
  },
};
