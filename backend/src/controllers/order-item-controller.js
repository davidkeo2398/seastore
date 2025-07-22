const { or } = require("sequelize");
const { orderItemService } = require("../services/index");
const { Order  } = require("../Model/Index");
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
      //lấy order_id từ req ng dùng
      const orderId = req.params.order_id;
      console.log("orderId", orderId);

      // lấy thông tin đơn hàng kiểm tra xem có tồn tại hay không
      const order = await Order.findByPk(orderId);
      console.log("order", order);
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }

      // Lấy danh sách sản phẩm trong đơn hàng
      const orderItems = await orderItemService.getOrderItemsByOrderId(orderId);
      console.log("Order items:", orderItems);

      res.status(200).json({ order, orderItems });
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

  getOrderItemsByProductId: async (req, res) => {
    try {
      const productId = req.params.product_id;
      const orderItems = await orderItemService.getOrderItemsByProductId(
        productId
      );
      res.status(200).json(orderItems);
    } catch (error) {
      console.error("Error fetching order items by product ID:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch order items by product ID" });
    }
  },


};
