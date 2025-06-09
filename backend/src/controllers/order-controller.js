const Order = require('../Model/Order');
const { orderService } = require('../services/index');
const generateCode = require('../utils/generateCode');

module.exports = {
    createOrder: async (req, res) => {
        try {
            const result = await orderService.createOrder(req.body, req.user);

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
            console.log('debug req', req.user)
            const result = await orderService.getOrders();
            return res.status(200).json({
                message: "Get orders successfully",
                data: result
            });
        }
        catch (err) {
            return res.status(400).json({
                message: "Get orders failed",
                data: [],
                error: err.message
            });
        }
    }
};