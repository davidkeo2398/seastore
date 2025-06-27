const rankAdminService = require("../../services");

module.exports = {
  getRanks: async (req, res) => {
    try {
      const data = await rankAdminService.getRanks();
      res.json({ message: "Lấy danh sách hạng thành công", data });
    } catch (err) {
      res.status(500).json({ message: "Lỗi lấy danh sách hạng", error: err.message });
    }
  },
  createRank: async (req, res) => {
    try {
      const data = await rankAdminService.createRank(req.body);
      res.status(201).json({ message: "Tạo hạng thành công", data });
    } catch (err) {
      res.status(500).json({ message: "Lỗi tạo hạng", error: err.message });
    }
  },
  updateRank: async (req, res) => {
    try {
      const data = await rankAdminService.updateRank(req.params.id, req.body);
      res.json({ message: "Cập nhật hạng thành công", data });
    } catch (err) {
      res.status(500).json({ message: "Lỗi cập nhật hạng", error: err.message });
    }
  },
  deleteRank: async (req, res) => {
    try {
      const data = await rankAdminService.deleteRank(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Lỗi xóa hạng", error: err.message });
    }
  },
  getMembersWithRank: async (req, res) => {
    try {
      const data = await rankAdminService.getMembersWithRank();
      res.json({ message: "Lấy danh sách thành viên thành công", data });
    } catch (err) {
      res.status(500).json({ message: "Lỗi lấy danh sách thành viên", error: err.message });
    }
  },
};