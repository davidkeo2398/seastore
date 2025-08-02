const { promotionAdminService } = require("../../services");

module.exports = {
    getPromotions: async (req, res) => {
        try {
            const promotions = await promotionAdminService.getPromotions();
            return res.status(200).json({ data: promotions });
        } catch (error) {
            console.error("Error fetching promotions:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    getPromotionById: async (req, res) => {
        try {
            const promotionId = req.params.id;
            const promotion = await promotionAdminService.getPromotionById(promotionId);
            if (!promotion) {
                return res.status(404).json({ error: "Promotion not found" });
            }
            return res.status(200).json({ data: promotion });
        } catch (error) {
            console.error("Error fetching promotion by ID:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    createPromotion: async (req, res) => {
        try {
            const promotionData = req.body;
            console.log("Creating promotion with data:", promotionData);

            if (!promotionData.promotion_name || !promotionData.promotion_code || !promotionData.promotion_percent) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const newPromotion = await promotionAdminService.createPromotion(promotionData);
            return res.status(201).json({ data: newPromotion });
        } catch (error) {
            console.error("Error creating promotion:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    updatePromotion: async (req, res) => {
        try {
            const promotionId = req.params.id;
            const promotionData = req.body;
            const updatedPromotion = await promotionAdminService.updatePromotion(promotionId, promotionData);
            return res.status(200).json({ data: updatedPromotion });
        } catch (error) {
            console.error("Error updating promotion:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    deletePromotion: async (req, res) => {
        try {
           const promotionId = req.params.id;
            const result = await promotionAdminService.deletePromotion(promotionId);
            if (result === 0) {
                return res.status(404).json({ error: "Promotion not found" });
            }
            return res.status(200).json({ message: "Promotion deleted successfully" });
        } catch (error) {
            console.error("Error deleting promotion:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}
