const { Order, Categories } = require("../../Model/Index");

// xử lý  logic, database
module.exports = {
  getOrders: async () => {
    try {
      const orders = await Order.findAll();
      console.log(orders);
      return orders;
    } catch (error) {
      console.error("Get order fails");
      throw new Error("Get orders fail: ", error);
    }
  },
  updateStatusOrderById: async (data, order_id) => {
    try {
      const { status } = data;
      const udpatedOrder = Order.update(
        { status: status },
        { where: { order_id: order_id } }
      );
      return udpatedOrder;
    } catch (error) {
      console.error("Update order by id fail");
      throw new Error("Update order by id fail: ", error);
    }
  },
  getOrderDetails: async (orderId) => {
    try {
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["user_id", "user_name", "user_email", "phone_user"],
          },
          {
            model: Agency,
            as: "agency",
            attributes: ["agency_name", "address_agency", "phone_agency"],
          },
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["product_id", "product_name", "price", "image"],
              },
            ],
          },
        ],
      });

      return order;
    } catch (error) {
      console.error("Error fetching admin order details:", error);
      throw new Error("Failed to fetch admin order details");
    }
  },
};
