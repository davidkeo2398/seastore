import { agencyrankService } from '../services/index.js';
export default {
    createAgencyrank: async (req,res) =>{
        try{
            const result = await agencyrankService.createAgencyrank(req.body);
            return res.status(200).json({
                message:"Tạo xếp hạng thành viên thành công ",
                data: result
            });
        }
        catch(error){
            return res.status(400).json({
                message: "Tạo xếp hạng thành viên không thành công",
                data: [],
                error: error.message
            });
        }
    },
    getAgencyrank: async (req,res) =>{
        try{
            const result = await agencyrankService.getAgencyrank(req.query);
            return res.status(200).json({
                message: "Get agencyrank successfully",
                data: result
            });
            
        }
         catch (err) {
            return res.status(400).json({
                message: "Get agencyrank failed",
                data: [],
                error: err.message
            });
        }
    }
}