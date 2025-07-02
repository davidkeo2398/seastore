const { AgencyRank, User } = require("../../Model/Index");
module.exports = {
  getRanks: async () => {
    try {
      console.log("Đang gọi AgencyRank.findAll() để lấy danh sách hạng.");
      const ranks = await AgencyRank.findAll();
      console.log("danh sách hạng:", ranks);
      console.log("Lấy danh sách hạng thành công.", ranks);
      return ranks;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hạng:", error);
      throw new Error("Không thể lấy danh sách hạng");
    }
  },
  createRank: async (data) => {
    try {
      const newRank = await AgencyRank.create(data);
      return newRank;
    } catch (error) {
      console.error("Lỗi khi tạo hạng:", error);
      throw new Error("Không thể tạo hạng");
    }
  },
  deleteRank: async (id) => {
    try {
      const rank = await AgencyRank.findByPk(id);
      if (!rank) {
        throw new Error("Hạng không tồn tại");
      }
      await rank.destroy();
      return { message: "Xóa hạng thành công" };
    } catch (error) {
      console.error("Lỗi khi xóa hạng:", error);
      throw new Error("Không thể xóa hạng");
    }
  },

  updateRank: async (id, data) => {
    try {
      const rank = await AgencyRank.findByPk(id);
      if (!rank) {
        throw new Error("Hạng không tồn tại");
      }
      await rank.update(data);
      return rank;
    } catch (error) {
      console.error("Lỗi khi cập nhật hạng:", error);
      throw new Error("Không thể cập nhật hạng");
    }
  },

  getMembersWithRank: async (id) => {
    return await User.findAll({
      include: [
        {
          association: "agencyRank", // alias nếu có
        },
      ],
    });
  },
};
