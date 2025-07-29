const { User, Role } = require("../../Model/Index");
const bcrypt = require("bcryptjs");

module.exports = {
  getUsers: async () => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["role_name"],
          },
        ],
        attributes: { exclude: ["password"] },
        order: [["createdAt", "DESC"]],
      });
      // Ghi đè user_name bằng first_name + last_name
      const updatedUsers = users.map((user) => {
        const plainUser = user.get({ plain: true });
        return {
          ...plainUser,
          user_name: `${plainUser.first_name} ${plainUser.last_name}`, // Gán lại user_name
        };
      });
      return updatedUsers;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết người dùng:", error);
      throw new Error("Không thể lấy chi tiết người dùng");
    }
  },
  countUser: async () => {
    try {
      return User.count();
    } catch (err) {
      console.error("Lỗi khi đếm người dùng:", err);
      return 0;
    }
  },
  getUserById: async (userId) => {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["role_name"],
          },
        ],
      });
      if (!user) {
        return null;
      }

      const plainUser = user.get({ plain: true });
      return {
        ...plainUser,
        user_name: `${plainUser.first_name} ${plainUser.last_name}`, // Gán lại user_name
      };
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết người dùng:", error);
      throw new Error("Không thể lấy chi tiết người dùng");
    }
  },
  createUser: async (userData) => {
    try {
      const { password, ...otherData } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        ...otherData,
        password: hashedPassword,
      });
      const { password: _, ...userWithoutPassword } = newUser.get({
        plain: true,
      });
      return userWithoutPassword;
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
      throw new Error("Không thể tạo người dùng");
    }
  },
  updateUser: async (userId, updateData) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("Không tìm thấy người dùng");
      }
      if (updateData.role_id && parseInt(updateData.role_id, 10) === 3) {
        // Tự động gán hạng mặc định là "Bronze" (ID = 1)
        updateData.agency_rank_id = 1;
        console.log(`Người dùng ${userId} được nâng cấp lên Agency, tự động gán agency_rank_id = 1.`);
      }
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      console.log("Dữ liệu cập nhật:", updateData);
      await user.update(updateData);
      const { password, ...userWithoutPassword } = user.get({ plain: true });
      return userWithoutPassword;
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      throw new Error("Không thể cập nhật người dùng");
    }
  },
  deleteUser: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("Không tìm thấy người dùng");
      }
      await user.destroy();
      return { message: "Xóa người dùng thành công" };
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      throw new Error("Không thể xóa người dùng");
    }
  },

  //Lấy danh sách khách hàng có tổng chi tiêu (từ các đơn hàng đã hoàn thành) trên 1 triệu.
  getHighValueCustomers: async () => {
    try {
      const customers = await User.findAll({
        include: [
          {
            model: Order,
            as: "orders",
            where: { status: "completed" },
            attributes: [],
          },
        ],
        attributes: {
          include: [
            [
              Sequelize.fn("SUM", Sequelize.col("orders.total_price")),
              "total_spent",
            ],
          ],
        },
        group: ["User.user_id"],
        having: Sequelize.where(
          Sequelize.fn("SUM", Sequelize.col("orders.total_price")),
          {
            [Sequelize.Op.gt]: 1000000,
          }
        ),
      });
      return customers;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
      throw new Error("Không thể lấy danh sách khách hàng");
    }
  },
};
