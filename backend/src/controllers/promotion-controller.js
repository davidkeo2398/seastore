const { getUserInfo } = require('../services/auth-service');
const { promotionService } = require('../services/index');



module.exports = {
    getPromotions: async (req, res) => {
        try {
            const result = await promotionService.getPromotions();

            return res.status(200).json({
                message: "Get promotions success",
                data: result
            });
        } catch (err) {
            return res.status(400).json({
                message: "Get promotions fail",
                data: [],
                error: err.message
            });
        }
    }
};