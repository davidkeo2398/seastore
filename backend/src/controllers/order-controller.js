const Order = require("../Model/Order");
const { orderService } = require("../services/index");
const { getOrderByUser } = require("../services/order-service");
const generateCode = require("../utils/generateCode");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const result = await orderService.createOrder(req.body, req.user);

      return res.status(200).json({
        message: "Order created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Order creation failed",
        data: [],
        error: error.message,
      });
    }
  },

  getOrders: async (req, res) => {
    try {
      console.log("debug req", req.user);
      const result = await orderService.getOrders();
      return res.status(200).json({
        message: "Get orders successfully",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Get orders failed",
        data: [],
        error: err.message,
      });
    }
  },

  getOrderByUser: async (req, res) => {
    try {
      console.log("debug req", req.user);
      const userId = req.user.user_id;
      const orders = await getOrderByUser(userId);
      return res.status(200).json({
        message: "Get orders by user successfully",
        data: orders,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get orders by user failed",
        data: [],
        error: error.message,
      });
    }
  }
};
