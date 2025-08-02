const { AgencyRank, User, Role } = require("../Model/Index");
const { getMembersWithRank } = require("./admin/rank-admin-service");
const { Op } = require("sequelize")
module.exports = {
  getAgencyRanks: async () => {
    try {
      const agency_ranks = AgencyRank.findAll();
      return agency_ranks;
    } catch (err) {
      throw new Error("Get Agency Ranks fails: ", err);
    }
  },
  getAgencyRankById: async (agency_rank_id) => {
    try {
      const agency_ranks = AgencyRank.findOne({
        where: { agency_rank_id: agency_rank_id },
      });
      return agency_ranks;
    } catch (err) {
      throw new Error("Get Agency Ranks fails: ", err);
    }
  },
  getMembersWithRank: async () => {
    const users = await User.findAll({
      where: {
        agency_rank_id: { [Op.ne]: null }, //not equal" (không bằng)
      },
      include: [
        {
          model: AgencyRank,
          as: "agencyRank", // alias
        },
        {
          model: Role,
          as: "role", // alias đúng với associate
        },
      ],
    });
    // Thêm flag admin_agency nếu role_id = 3
    const result = users.map((user) => {
      const userJson = user.toJSON();
      return {
        ...userJson,
        is_admin_agency: userJson.role_id === 3, // hoặc userJson.role.role_name === 'admin_agency'
      };
    });
     return result;
  },
  getAgencyRankProgress: async (agencyRankId) => {
    try {
      // Lấy hạng hiện tại theo ID
      const currentRank = await AgencyRank.findByPk(agencyRankId);
      if (!currentRank) {
        throw new Error("Không tìm thấy hạng hiện tại.");
      }

      // Lấy danh sách các hạng, sắp xếp theo giá trị tối thiểu
      const ranks = await AgencyRank.findAll({
        order: [["min_accumulated_value", "ASC"]],
      });

      // Tính tổng chi tiêu của người dùng (giả sử có tổng chi tiêu trong bảng User)
      const totalSpent = currentRank.totalSpent || 0;

      // Tìm hạng tiếp theo
      const nextRank = ranks.find(
        (rank) => rank.min_accumulated_value > totalSpent
      );

      let progress = {
        currentRank: currentRank.agency_rank_name,
        discountPercent: currentRank.discount_percent,
        totalSpent,
        nextRank: null,
      };

      if (nextRank) {
        const remaining = nextRank.min_accumulated_value - totalSpent;
        const percent =
          (totalSpent / nextRank.min_accumulated_value) * 100;

        progress.nextRank = {
          rank: nextRank.agency_rank_name,
          remaining,
          percent: Math.min(percent, 100),
        };
      }

      return progress;
    } catch (error) {
      console.error("Lỗi khi tính tiến độ hạng:", error);
      throw new Error("Không thể tính tiến độ hạng.");
    }
  },
};
