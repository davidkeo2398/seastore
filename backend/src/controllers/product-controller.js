
const { productService } = require("../services/index");

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

  getCountProductByCateory: async (req, res) => {
    try {
      const result = await productService.getCountProductByCateory(
        req.params.category_id
      );

      return res.status(200).json({
        message: "Get count product by category sucessfully",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Get count product by category fail",
        data: [],
        error: error.message,
      });
    }
  },

  getLowNumberInventory: async (req, res) => {
    try {
      const result = await productService.getLowNumberInventory();

      return res.status(200).json({
        message: "Get low number inventory products successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get low number inventory products fail",
        data: [],
        error: error.message,
      });
    }
  },

  getProductByDescriptionCategory: async (req, res) => {
    try {
      const result = await productService.getProductByDescriptionCategory(
        req.params.category_id
      );
      return res.status(200).json({
        message: "Get products by description category successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get products by description category fail",
        data: [],
        error: error.message,
      });
    }
  },
};
