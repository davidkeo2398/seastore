const { productService } = require("../services/index");
const { createProduct } = require("../services/product-service");

module.exports = {
  createProduct: async (req, res) => {
    try {
      const result = await productService.createProduct(req.body);

      return res.status(200).json({
        message: "Product created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Product creation failed",
        data: [],
        error: error.message,
      });
    }
  },
  getProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1
      console.log(page);
      const size = parseInt(req.query.size) || 30; // Default to 30
      console.log(size);
      console.log(req.query.search);
      const result = await productService.getProducts(
        req.query.search,
        page,
        size
      );

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
