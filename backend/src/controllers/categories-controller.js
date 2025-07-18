const { categoriesService } = require('../services/index');

module.exports = {
    getCategories: async (req, res) => {
        try {
            const result = await categoriesService.getCategories();
            return res.status(200).json({
                message: "Get categories sucessully",
                data: result
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "Get categories fail",
                data: [],
                error: error.message
            });
        }

    },

};