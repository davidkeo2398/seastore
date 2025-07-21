const { or } = require("sequelize");
const Order = require("../Model/Order");
const orderItemService = require("../services/order-item-service");

module.exports = {
  createOrderItem: async (req, res) => {
    try {
      const newOrderItem = await orderItemService.createOrderItem(req.body);
      res.status(201).json(newOrderItem);
    } catch (error) {
      console.error("Error creating order item:", error);
      res.status(500).json({ error: "Failed to create order item" });
    }
  },
  getOrderItemsByOrderId: async (req, res) => {
    try {
      const orderId = req.params.order_id;
      const order = await Order.findByPk(orderId);
      const orderItems = await orderItemService.getOrderItemsByOrderId(orderId);

      res.json({ order, orderItems });
    } catch (error) {
      console.error("Error fetching order items:", error);
      res.status(500).json({ error: "Failed to fetch order items" });
    }
  },
  updateOrderItem: async (req, res) => {
    try {
      const updatedOrderItem = await orderItemService.updateOrderItem(
        req.params.id,
        req.body
      );
      res.json(updatedOrderItem);
    } catch (error) {
      console.error("Error updating order item:", error);
      res.status(500).json({ error: "Failed to update order item" });
    }
  },
  deleteOrderItem: async (req, res) => {
    try {
      const result = await orderItemService.deleteOrderItem(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("Error deleting order item:", error);
      res.status(500).json({ error: "Failed to delete order item" });
    }
  },
};
