const { raw } = require("body-parser");
const {
  Order,
  OrderItem,
  Product,
  User,
  Categories,
  AgencyRank,
} = require("../../Model/Index");
const { sequelize } = require("../../config/dbcontext");


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
    const t = await sequelize.transaction();
    try {
      const { status, user_id, payment_method } = data;
      const updatedOrder = await Order.update(
        { status: status },
        { where: { order_id: order_id }, transaction: t }
      );

      // Nếu trạng thái không phải "completed", không cần nâng hạng
      if (status !== "completed") {
        await t.commit();
        return updatedOrder;
      }
      if (payment_method === "vnpay") {
        console.log("Thanh toán qua VNPAY mặc định hoàn thành và nâng hạng");
      }

      const ordersTotal = await Order.sum("total", {
        // đơn hàng đã hoàn thành
        where: { user_id, status: "completed" },
        transaction: t,
      });

      const user = await User.findOne({ where: { user_id: user_id } });
      if (!user) {
        throw new Error(`User with ID '${user_id}' not found`);
      }

      let rankName = null;
      // hạng thành viên
      if (ordersTotal >= 40_000_000) {
        // so sánh hạng cao nhất
        rankName = "Diamond";
      } else if (ordersTotal >= 30_000_000) {
        rankName = "Platinum";
      } else if (ordersTotal >= 10_000_000) {
        rankName = "Gold";
      } else if (ordersTotal >= 5_000_000) {
        rankName = "Silver";
      } else if (ordersTotal >= 1_000_000) {
        rankName = "Bronze";
      }

      // Nếu không có hạng mới, không cần cập nhật
      if (!rankName) {
        await t.commit();
        return updatedOrder;
      }

      // cập nhật hạng thành viên nếu có
      if (rankName) {
        const agency = await AgencyRank.findOne({
          // lấy danh sách hạng thành viên
          where: { agency_rank_name: rankName },
          transaction: t, //truy vấn trong giao dịch hiện tại
        });
        if (!agency) {
          throw new Error(`Agency rank '${rankName}' not found`);
        }
        console.log("agency", rankName);
        // cập nhật hạng thành viên cho người dùng
        await user.update({ agency_rank_id: agency.agency_rank_id });
      }
      await t.commit();
      return updatedOrder;
    } catch (error) {
      console.error("Update order by id fail");
      await t.rollback();
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

  // tính được tổng số lượng sản phẩm thuộc một danh mục trong đơn hàng
  getTotalProductsByCategoryOnOrder: async (orderId) => {
    try {
      const statistics = await sequelize.query(
        `
        SELECT 
          p.category_id, 
          c.category_name, 
          SUM(oi.quantity) AS total_quantity
        FROM 
          orders_item oi
        JOIN 
          products p ON oi.product_id = p.product_id
        JOIN 
          categories c ON p.category_id = c.category_id
        WHERE 
          oi.order_id = :orderId
        GROUP BY 
          p.category_id, c.category_name;
        `,
        {
          replacements: { orderId: orderId }, // Thay thế giá trị :orderId
          type: sequelize.QueryTypes.SELECT, // Loại truy vấn là SELECT
        }
      );

      return statistics;
    } catch (error) {
      console.error("Error fetching total products by category:", error);
      throw new Error("Failed to fetch total products by category");
    }
  },
};
