const { userAdminService } = require("../../services");
const { getHighValueCustomers } = require("../../services/admin/user-admin-service");
const { updateMemberRankByCompletedOrder } = require("../../services/admin/rank-admin-service");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const result = await userAdminService.getUsers();
      res
        .status(200)
        .json({ message: "Lấy danh sách người dùng thành công", data: result });
    } catch (error) {
      res.status(500).json({
        message: "++",
        error: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const result = await userAdminService.getUserById(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }
      res
        .status(200)
        .json({ message: "Lấy chi tiết người dùng thành công", data: result });
    } catch (error) {
      res.status(500).json({
        message: "Lấy chi tiết người dùng thất bại",
        error: error.message,
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const result = await userAdminService.createUser(req.body);
      res
        .status(201)
        .json({ message: "Tạo người dùng thành công", data: result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Tạo người dùng thất bại", error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const result = await userAdminService.updateUser(req.params.id, req.body);
      res
        .status(200)
        .json({ message: "Cập nhật người dùng thành công", data: result });
    } catch (error) {
      res.status(500).json({
        message: "Cập nhật người dùng thất bại",
        error: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const result = await userAdminService.deleteUser(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Xóa người dùng thất bại", error: error.message });
    }
  },
  updateUserStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const user = await userAdminService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      await userAdminService.updateUser(id, { status });
      res.json({
        message: `Cập nhật trạng thái người dùng thành công: ${status}`,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Cập nhật trạng thái người dùng thất bại",
          error: error.message,
        });
    }
  },
  getHighValueCustomers: async (req, res) => {
    try {
      const result = await getHighValueCustomers();
      res.status(200).json({
        message: "Lấy danh sách khách hàng giá trị cao thành công",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lấy danh sách khách hàng giá trị cao thất bại",
        error: error.message,
      });
    }
  }
  
};
