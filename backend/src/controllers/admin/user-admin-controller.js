const { userAdminService } = require("../../services");

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
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
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
};
