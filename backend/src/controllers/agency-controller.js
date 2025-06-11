const { agencyRankService } = require("../services");


module.exports = {
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
    getAgency : async (req, res) => {
        try{
            console.log('debug req')
             // Truyền req.query xuống service để xử lý lọc, phân trang, tìm kiếm
            const result = await agencyService.getAgency(req.query);
            return res.status(200).json({
                message: "Get agency successfully",
                data: result
            });
        }
        catch (err) {
            return res.status(400).json({
                message: "Get agency failed",
                data: [],
                error: err.message
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
    }
}
