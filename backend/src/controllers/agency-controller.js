const { agencyRankService } = require("../services");
   
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
     createAgency: async (req, res) => {
        try{
            const result = await agencyRankService.createAgency(req.body);
            return res.status(200).json({
                message: "Tạo đại lý thành công",
                data: result
            });
        } catch (error){
            return res.status(400).json({
                message: "Taọ đại lý không thành công",
                data: [],
                error: error.message
            });
        }
    },
    updateAgency: async (req, res) => {
        try {
            const agencyId = req.params.id;
            const updateData = req.body;
            const result = await agencyService.updateAgency(agencyId, updateData);
            return res.status(200).json({
                message: "Update agency successfully",
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                message: "Update agency failed",
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
