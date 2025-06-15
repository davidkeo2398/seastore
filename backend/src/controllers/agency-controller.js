const { agencyService } = require('../services/index');



module.exports = {
    getAgencies: async (req, res) => {
        try {
            const result = await agencyService.getAgencies();
            return res.status(200).json({
                message: "Get agencies success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Get agencies fail",
                data: [],
                error: error.message
            });
        }
    },
    getAgencyById: async (req, res) => {
        try {
            const result = await agencyService.getAgencyById(req.params.agency_id);
            return res.status(200).json({
                message: "Get agency by id success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Get agency by id fail",
                data: [],
                error: error.message
            });
        }
    }
};