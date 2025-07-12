const {
  AgencyRank,
  User,
  Role,
  Order,
  sequelize,
} = require("../../Model/Index");

// Lấy tất cả các hạng, sắp xếp tăng dần theo min_accumulated_value
async function getAllRanks() {
  return await AgencyRank.findAll({
    order: [["min_accumulated_value", "ASC"]],
  });
}

// Lấy tất cả user là thành viên (role_id = 3)
async function getAllMembers() {
  return await User.findAll({
    where: { role_id: 3 },
    attributes: [
      "user_id",
      "user_name",
      "first_name",
      "last_name",
      "email",
      "phone",
      "createdAt",
      "agency_rank_id",
      [
        sequelize.fn(
          "SUM",
          sequelize.literal(// tổng đơn hàng đã hoàn thành
            "CASE WHEN `orders`.`status` = 'completed' THEN `orders`.`total` ELSE 0 END"
          )
        ),
        "total_spent",
      ],
    ],
    include: [
      {
        model: Order,
        as: "orders",
        attributes: [],
        required: false,
      },
      {
        model: AgencyRank,
        as: "agencyRank",
      },
      {
        model: Role,
        as: "role",
      },
    ],
    group: ["User.user_id", "agencyRank.agency_rank_id", "role.role_id"],
  });
}

// Tính toán thông tin rank cho từng thành viên
function buildMemberRankData(member, allRanks) {
  const memberJson = member.get({ plain: true });
  const totalSpent = parseFloat(memberJson.total_spent || 0); // Tổng chi tiêu của thành viên
  const currentRank = memberJson.agencyRank; // hạng hiện tại của thành viên

  let nextRank = null;
 

  //xác định hạng tiếp theo
  if (currentRank) { // Nếu thành viên có hạng hiện tại
    // Tìm hạng tiếp theo trong danh sách hạng nếu hạng hiện tại không phải là hạng cao nhất
    const currentRankIndex = allRanks.findIndex(
      (r) => r.agency_rank_id === currentRank.agency_rank_id
    );
    if (currentRankIndex < allRanks.length - 1) {
      nextRank = allRanks[currentRankIndex + 1];
    }
  } else {
    nextRank = allRanks[0];
  }
// phần trăm tiến độ đạt hạng
  let rankProgress = 100;
  if (nextRank) {
    const minForNextRank = nextRank.min_accumulated_value; // chi tiêu tối thiểu để đạt hạng tiếp theo
    // Tính phần trăm tiến độ đạt hạng tiếp theo
    rankProgress = minForNextRank > 0 ? (totalSpent / minForNextRank) * 100 : 100;
  }

  return {
    user_id: memberJson.user_id,
    phone: memberJson.phone,
    createdAt: memberJson.createdAt,
    member_info: {
      user_name: `${memberJson.first_name} ${memberJson.last_name}`,
      email: memberJson.email,
    },
    rank_info: {
      name: currentRank ? currentRank.agency_rank_name : "Chưa có hạng",
      discount_percent: currentRank ? currentRank.discount_percent : 0,
    },
    total_spent: totalSpent,
    rank_progress: {
      percent: Math.min(rankProgress, 100).toFixed(2),
      next_rank_name: nextRank
        ? nextRank.agency_rank_name
        : "Đã đạt hạng cao nhất",
      remaining: nextRank
        ? Math.max(0, nextRank.min_accumulated_value - totalSpent)
        : 0,
    },
    rank_valid_until: memberJson.rank_expiration_date,
    actions: ["view_details", "edit_rank"],
  };
}

module.exports = {
  getRanks: async () => {
    try {
      console.log("Đang gọi AgencyRank.findAll() để lấy danh sách hạng.");
      const agency_ranks = await AgencyRank.findAll();
      console.log("danh sách hạng:", agency_ranks);
      console.log("Lấy danh sách hạng thành công.", agency_ranks);
      return agency_ranks;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hạng:", error);
      throw new Error("Không thể lấy danh sách hạng");
    }
  },
  getRankById: async (rank_id) => {
    try {
      const agency_rank = await AgencyRank.findOne({
        where: { rank_id: rank_id },
      });
      return agency_rank;
    } catch (error) {
      throw new Error("Không thể lấy hạng" + error.message);
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

  getMembersWithRank: async () => {
    try {
      const allRanks = await getAllRanks();
      const members = await getAllMembers();
      const result = members.map((member) => buildMemberRankData(member, allRanks));
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thành viên theo hạng:", error);
      throw new Error("Không thể lấy danh sách thành viên");
    }
  },
};
