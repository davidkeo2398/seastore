const { orderService } = require('../services/index');
const generateCode = require('../ultils/generateCode');

module.exports = {
    createOrder: async (req, res) => {
        try {

            const result = await orderService.createOrder(req.body);

            return res.status(200).json({
                message: "Order created successfully",
                data: result
            });
        } catch (error) {
            return res.status(400).json({
                message: "Order creation failed",
                data: [],
                error: error.message
            });
        }
    },
    //
    getOrders: async (req, res) => {
        try {

        }
        catch (err) {

        }
    }
};