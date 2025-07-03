const {
  AgencyRank,
  User,
  Role,
  Order,
  sequelize,
} = require("../../Model/Index");
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
      // 1. Lấy tất cả các hạng để tính toán tiến độ
      const allRanks = await AgencyRank.findAll({
        order: [["min_accumulated_value", "ASC"]],
      });

      // 2. Lấy tất cả user là thành viên (role_id = 3)
      const members = await User.findAll({
        where: {
          role_id: 3,
        },
        attributes: [
          "user_id",
          "user_name",
          "first_name",
          "last_name",
          "email",
          "agency_rank_id",
          // "rank_expiration_date",
          // Tính tổng chi tiêu từ các đơn hàng đã hoàn thành
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
          {
            model: Order,
            as: "orders",
            attributes: [], // Không cần lấy chi tiết từng order ở đây
            required: false, // LEFT JOIN để vẫn lấy user dù chưa có order
          },
          {
            model: AgencyRank,
            as: "agencyRank", // Phải có alias này trong model User
          },
          {
            model: Role,
            as: "role", // Phải có alias này trong model User
          },
        ],
        group: ["User.user_id", "agencyRank.agency_rank_id", "role.role_id"],
      });

      // 3. Xử lý và tính toán thêm dữ liệu cho mỗi thành viên
      const result = members.map((member) => {
        const memberJson = member.get({ plain: true });
        const totalSpent = parseFloat(memberJson.total_spent || 0);
        const currentRank = memberJson.agencyRank;

        let nextRank = null;
        let rankProgress = 0;

        if (currentRank) {
          // Tìm hạng tiếp theo
          const currentRankIndex = allRanks.findIndex(
            (r) => r.agency_rank_id === currentRank.agency_rank_id
          );
          if (currentRankIndex < allRanks.length - 1) {
            nextRank = allRanks[currentRankIndex + 1];
          }
        } else {
          // Nếu chưa có hạng, hạng tiếp theo là hạng thấp nhất
          nextRank = allRanks[0];
        }

        // Tính tiến độ lên hạng
        if (nextRank) {
          const minForNextRank = nextRank.min_accumulated_value;
          // Tránh chia cho 0 nếu mốc đầu tiên là 0
          if (minForNextRank > 0) {
            rankProgress = (totalSpent / minForNextRank) * 100;
          } else {
            rankProgress = 100;
          }
        } else {
          // Đã đạt hạng cao nhất
          rankProgress = 100;
        }

        return {
          user_id: memberJson.user_id,
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
      });

      return result;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thành viên theo hạng:", error);
      throw new Error("Không thể lấy danh sách thành viên");
    }
  },
};
