const { OrderItem, Product } = require("../Model/Index");

module.exports = {
  createOrderItem: async (orderItemData) => {
    try {
      const newOrderItem = await OrderItem.create(orderItemData);
      return newOrderItem;
    } catch (error) {
      console.error("Lỗi khi tạo chi tiết đơn hàng:", error);
      throw new Error("Error creating order item");
    }
  },
  getOrderItemsByOrderId: async (orderId) => {
    try {
      const orderItems = await OrderItem.findAll({
        where: { order_id: orderId }, // orderId là  biến  của đơn hàng
        include: [
          {
            model: Product,
            as: "product", // Đảm bảo alias 'product' khớp với định nghĩa trong model
            attributes: ["product_id", "product_name", "price"], // Chỉ lấy các cột cần thiết
          },
        ],
      });
      return orderItems;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      throw new Error("Error fetching order items");
    }
  },
  updateOrderItem: async (orderItemId, updateData) => {
    try {
      const [updatedRows, [updatedOrderItem]] = await OrderItem.update(
        updateData,
        {
          where: { order_item_id: orderItemId },
          returning: true,
        }
      );
      if (updatedRows === 0) {
        throw new Error("Order item not found or no changes made");
      }
      return updatedOrderItem;
    } catch (error) {
      console.error("Error updating order item:", error);
      throw new Error("Failed to update order item");
    }
  },
  deleteOrderItem: async (orderItemId) => {
    try {
      const deletedRows = await OrderItem.destroy({
        where: { order_item_id: orderItemId },
      });
      if (deletedRows === 0) {
        throw new Error("Order item not found");
      }
      return { message: "Order item deleted successfully" };
    } catch (error) {
      console.error("Error deleting order item:", error);
      throw new Error("Failed to delete order item");
    }
  },
};
