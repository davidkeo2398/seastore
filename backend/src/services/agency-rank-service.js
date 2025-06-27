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
};
