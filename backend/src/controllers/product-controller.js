const { productService } = require("../services/index");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const result = await productService.getProducts();

      return res.status(200).json({
        message: "Get products sucessfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get products fail",
        data: [],
        error: error.message,
      });
    }
  },
  //
  getProductById: async (req, res) => {
    try {
      const result = await productService.getProductById(req.params.product_id);

      return res.status(200).json({
        message: "Get a product sucessfully",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Get a product fail",
        data: [],
        error: error.message,
      });
    }
  },
  //
  getProductByCategory: async (req, res) => {
    try {
      const result = await productService.getProductByCategory(
        req.params.category_id
      );

      return res.status(200).json({
        message: "Get products by category sucessfully",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Get products by category fail",
        data: [],
        error: error.message,
      });
    }
  },
};
