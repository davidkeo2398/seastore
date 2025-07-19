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
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
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
};
