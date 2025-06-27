const { AgencyRank, User } = require("../../Model/Index");

module.exports = {
  getRanks: async () => {
    return await AgencyRank.findAll();
  },
  createRank: async (data) => {
    return await AgencyRank.create(data);
  },
  updateRank: async (id, data) => {
    const rank = await AgencyRank.findByPk(id);
    if (!rank) throw new Error("Không tìm thấy hạng");
    await rank.update(data);
    return rank;
  },
  deleteRank: async (id) => {
    const rank = await AgencyRank.findByPk(id);
    if (!rank) throw new Error("Không tìm thấy hạng");
    await rank.destroy();
    return { message: "Xóa hạng thành công" };
  },
  getMembersWithRank: async () => {
    return await User.findAll({
      include: [
        {
          association: "agencyRank", // alias nếu có
        },
      ],
    });
  },
};
