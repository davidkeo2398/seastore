const { raw } = require("body-parser");
const { Order, OrderItem, Product, User } = require("../../Model/Index");

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
      //   const order = await Order.findByPk(orderId, {}); // x
      //   const order_items = await OrderItem.findAll({
      //     where: { order_id: orderId },
      //   }); // y
      //   const products = [];
      //   for (const item of order_items) {
      //     const product = await Product.findOne({where: {product_id: item.product_id}, raw: true}); // lấy thông tin sản phẩm
      //     const newProduct = {...product, quantity: item.quantity}
      //     products.push(newProduct);
      //   }

      //   return { order: order, items: products };
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: User,
            as: "user",
            // attributes: ["user_id", "user_name", "email", "phone"],
          },
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                // attributes: ["product_id", "product_name", "price", "image"],
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
