const { productService } = require('../services/index');



module.exports = {
    getProducts: async (req, res) => {
        try {
            const result = await productService.getProducts();

            return res.status(200).json({
                message: "Get products sucessfully",
                data: result
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Get products fail",
                data: [],
                error: error.message
            });
        }

    }
};