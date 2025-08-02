const { Promotion } = require("../../Model/Index");
module.exports = {
  getPromotions: async () => {
    try {
      const promotions = await Promotion.findAll();
      return promotions;
    } catch (err) {
      console.error("Get promotions fails: ", err);
      throw new Error("Get promotions fails: ", err);
    }
  },
  getPromotionById: async (promotionId) => {
    try {
      console.log("Fetching promotion with ID:", promotionId);
      const promotion = await Promotion.findByPk(promotionId);
      console.log("Promotion details:", promotion);
      return promotion || null;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết khuyến mãi:", error);
      throw new Error("Không thể lấy chi tiết khuyến mãi");
    }
  },
  createPromotion: async (promotionData) => {
    try {
      const newPromotion = await Promotion.create(promotionData);
      return newPromotion;
    } catch (error) {
      console.error("Lỗi khi tạo khuyến mãi:", error);
      throw new Error("Không thể tạo khuyến mãi");
    }
  },
  updatePromotion: async (promotionId, promotionData) => {
    try {
      const [updatedRowsCount, updatedRows] = await Promotion.update(
        promotionData,
        { where: { promotion_id: promotionId }, returning: true }
      );
      if (updatedRowsCount === 0) {
        throw new Error(`Khuyến mãi với ID '${promotionId}' không tồn tại`);
      }
      return updatedRows[0];
    } catch (error) {
      console.error("Lỗi khi cập nhật khuyến mãi:", error);
      throw new Error("Không thể cập nhật khuyến mãi");
    }
  },
  deletePromotion: async (promotionId) => {
    try {
      const deletedRowsCount = await Promotion.destroy({
        where: { promotion_id: promotionId },
      });
      if (deletedRowsCount === 0) {
        throw new Error(`Khuyến mãi với ID '${promotionId}' không tồn tại`);
      }
      return deletedRowsCount;
    } catch (error) {
      console.error("Lỗi khi xóa khuyến mãi:", error);
      throw new Error("Không thể xóa khuyến mãi");
    }
  },
};
