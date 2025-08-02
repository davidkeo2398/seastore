const {
  AgencyRank,
  User,
  Role,
  Order,
  sequelize,
} = require("../../Model/Index");

async function getAllRanksSorted() {
  return await AgencyRank.findAll({
    order: [["min_accumulated_value", "ASC"]],
  });
}

// lấy ds đại lý và tổng chi tiêu của họ
async function getMembersWithTotalSpent() {
  return await User.findAll({
    where: { role_id: 3 },
    attributes: [
      "user_id",
      "first_name",
      "last_name",
      "email",
      "phone",
      "createdAt",
      "agency_rank_id",
      [
        sequelize.fn(
          "SUM",
          sequelize.literal(
            "CASE WHEN `orders`.`status` = 'completed' THEN `orders`.`total` ELSE 0 END"
          )
        ),
        "total_spent",
      ],
    ],
    include: [
      // req: vẫn lấy all ng dùng ngay cả những người chưa có đơn hàng
      { model: Order, as: "orders", attributes: [], required: false },
      { model: AgencyRank, as: "agencyRank" },
      { model: Role, as: "role" },
    ],
    // gpm tất cả đơn của cùng người dùng( vì vừa hiển thị vừa sum)
    group: ["User.user_id", "agencyRank.agency_rank_id", "role.role_id"],
  });
}


function getNextRank(currentRank, allRanks) {
  if (!currentRank) return allRanks[0];
  const currentRankIndex = allRanks.findIndex(
    (r) => r.agency_rank_id === currentRank.agency_rank_id
  );
  if (currentRankIndex === -1) {
    console.error("Hạng hiện tại không tồn tại trong danh sách hạng.");
    return null;
  }
  return currentRankIndex < allRanks.length - 1
    ? allRanks[currentRankIndex + 1]
    : null;
}


function calculateRankProgress(totalSpent, nextRank) {
  if (!nextRank) return 100;
  const minForNextRank = nextRank.min_accumulated_value;
  if (totalSpent >= minForNextRank) return 100; // Đã đạt hạng tiếp theo
  return (totalSpent / minForNextRank) * 100;
}

async function updateMemberRank(userId, totalSpent) {
  const allRanks = await getAllRanksSorted();
  const currentRank = await User.findByPk(userId, {
    include: { model: AgencyRank, as: "agencyRank" },
  });

  const nextRank = getNextRank(currentRank.agencyRank, allRanks);

  if (nextRank && totalSpent >= nextRank.min_accumulated_value) {
    await User.update(
      { agency_rank_id: nextRank.agency_rank_id },
      { where: { user_id: userId } }
    );
    console.log(`Hạng của thành viên ${userId} đã được nâng lên ${nextRank.agency_rank_name}`);
  }
}

// Xây dựng dữ liệu thành viên với thông tin xếp hạng
function buildMemberRankData(member, allRanks) {
  const memberJson = member.get({ plain: true });//
  const totalSpent = parseFloat(memberJson.total_spent || 0);//tong
  const currentRank = memberJson.agencyRank;//hang hiện tại
  const nextRank = getNextRank(currentRank, allRanks);
  const rankProgress = calculateRankProgress(totalSpent, nextRank);//tiến độ

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
  };
}

//controller
module.exports = {
  getMembersWithRank: async () => {
    try {
      const allRanks = await getAllRanksSorted();
      const members = await getMembersWithTotalSpent();
      const result = members.map((member) =>
        buildMemberRankData(member, allRanks)
      );
      return result;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thành viên theo hạng:", error);
      throw new Error("Không thể lấy danh sách thành viên");
    }
  },

  getRanks: async () => {
    return await AgencyRank.findAll();
  },

  createRank: async (data) => {
    return await AgencyRank.create(data);
  },

  updateRank: async (id, data) => {
    const rank = await AgencyRank.findByPk(id);
    if (!rank) throw new Error("Hạng không tồn tại");
    return await rank.update(data);
  },

  deleteRank: async (id) => {
    const rank = await AgencyRank.findByPk(id);
    if (!rank) throw new Error("Hạng không tồn tại");
    await rank.destroy();
    return { message: "Xóa hạng thành công" };
  },
};