const { getUserInfo } = require('../services/auth-service');
const { agencyRankService } = require('../services/index');



module.exports = {
    getAgencyRanks: async (req, res) => {
        try {
            const result = await agencyRankService.getAgencyRanks();
            return res.status(200).json({
                message: "Get agency ranks success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Get agency ranks fail",
                data: [],
                error: error.message
            });
        }
    },
    getAgencyRankById: async (req, res) => {
        try {
            const result = await agencyRankService.getAgencyRankById(req.params.agency_rank_id);
            return res.status(200).json({
                message: "Get agency rank by id success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Get agency rank by id fail",
                data: [],
                error: error.message
            });
        }
    },
    getAgencyRankProgress: async (req, res) => {
        try {
            const { id } = req.params; // Lấy agency_rank_id từ URL
            const progress = await agencyRankService.getAgencyRankProgress(id);

            res.status(200).json({
                message: "Lấy tiến độ hạng thành công.",
                data: progress,
            });
        } catch (error) {
            console.error("Lỗi khi lấy tiến độ hạng:", error);
            res.status(500).json({
                message: "Không thể lấy tiến độ hạng.",
                error: error.message,
            });
        }
    },
};