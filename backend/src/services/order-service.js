const {
  User,
  Order,
  OrderItem,
  Product,
  Agency,
  AgencyRank,
} = require("../Model/Index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/authentication");
const { generateCode } = require("../utils/generateCode");
const { sequelize } = require("../config/dbcontext");

module.exports = {
  createOrder: async (orderData, userInfo) => {
    // nếu có lỗi xảy ra trong quá trình tạo đơn hàng, sẽ rollback lại toàn bộ
    const t = await sequelize.transaction();
    try {
      const order_code = generateCode();
      const {
        user_id,
        user_name,
        first_name,
        last_name,
        email,
        phone,
        address,
        role_id,
        resources,
      } = userInfo;

      const {
        user_email,
        address_user,
        agency_name,
        address_agency,
        phone_user,
        phone_agency,
        total,
        promotion_id,
        order_date,
        payment_method,
        promotion_code,
        products,
        // status
      } = orderData;
      const user = User.findOne({ where: { user_id: user_id } });
      if (!user) {
        throw new Error("The user is not exist");
      }
      const payload = {
        order_code: order_code,
        user_id: user_id,
        user_name: user_name,
        user_email: user_email,
        address_user: address_user ?? "",
        agency_name: agency_name ?? null,
        address_agency: address_agency ?? "",
        phone_user: phone_user ?? "",
        phone_agency: phone_agency ?? "",
        total: total,
        promotion_id: promotion_id ?? null,
        order_date: order_date,
        payment_method: payment_method,
        promotion_code: promotion_code ?? null,
        status: "pending", // mặc định là đã hoàn thành
      };
      console.log("payload", payload);
      // ghi vào database
      const newOrder = await Order.create(payload);
      //chi tiết đơn hàng
      const orderItems = await Promise.all(
        products.map((product) =>
          OrderItem.create({
            order_id: newOrder.order_id,
            product_id: product.product_id,
            quantity: product.quantity,
            isPaid: false,
          })
        )
      );

      //giảm số lượng tồn kho : tổng : hạng
      if (newOrder.status === "completed") {
        await Promise.all(
          orderItems.map((product) => {
            Product.findOne({ where: { product_id: product.product_id } }).
            then( // xử lý : decrement trừ số lượng tồn kho
              (model) => {
                model.decrement({ number_of_inventory: product.quantity }); // giảm số lượng tồn kho
              }
            );
          })
        );
        
        //tính tổng chi tiêu
        const ordersTotal = await Order.sum("total", { // đơn hàng đã hoàn thành
          where: { user_id, status: "completed" },
          transaction: t,
        });

        // hạng thành viên
        if (ordersTotal >= 40_000_000) { // so sánh hạng cao nhất
          rankName = "Diamond";
        } else if (ordersTotal >= 30_000_000) {
          rankName = "Platinum";
        } else if (ordersTotal >= 10_000_000) {
          rankName = "Gold";
        } else if (ordersTotal >= 5_000_000) {
          rankName = "Silver";
        } else if (ordersTotal >= 1_000_000) {
          rankName = "Bronze";
        } else {
          rankName = null;
        }

        // cập nhật hạng thành viên nếu có
        if (rankName) {
          const agency = await AgencyRank.findOne({ // lấy danh sách hạng thành viên
            where: { agency_rank_name: rankName },
            transaction: t, //truy vấn trong giao dịch hiện tại
          });
          if (!agency) {
            throw new Error(`Agency rank '${rankName}' not found`);
          }
          // cập nhật hạng thành viên cho người dùng
          await user.then((model) => { 
            model.update({ agency_rank_id: agency.agency_rank_id }); // nếu xác định hạng mới, cập nhật hạng cho người dùng
          });
        }
      }
      await t.commit();

      return { order: newOrder, orderItems: orderItems };
    } catch (error) {
      console.error("Error creating order:", error);
      await t.rollback();
      throw new Error("Failed to create order");
    }
  },
    countOrder: async () => {
    try {
      return Order.count();
    } catch (err) {
      return 0
    }
  },
  getOrders: async () => {
    try {
      const orders = Order.findAll();
      return orders;
    } catch (err) {
      throw new Error("Fail to get orders: ", err);
    }
  },

  getOrderById: async (orderId) => {
    try {
      const order = await Order.findByPk(orderId);
      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw new Error("Failed to fetch order");
    }
  },

  updateOrder: async (orderId, updateData) => {
    try {
      const [updatedRows, [updatedOrder]] = await Order.update(updateData, {
        where: { order_id: orderId },
        returning: true,
      });
      if (updatedRows === 0) {
        throw new Error("Order not found or no changes made");
      }
      return updatedOrder;
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error("Failed to update order");
    }
  },

  deleteOrder: async (orderId) => {
    try {
      const deletedRows = await Order.destroy({ where: { order_id: orderId } });
      if (deletedRows === 0) {
        throw new Error("Order not found");
      }
      return { message: "Order deleted successfully" };
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Failed to delete order");
    }
  },

  getOrderByUser: async (userId) => {
    try {
      const orders = await Order.findAll({ where: { user_id: userId } });
      return orders;
    } catch (error) {
      console.error("Error fetching orders by user:", error);
      throw new Error("Failed to fetch orders by user");
    }
  },
};
