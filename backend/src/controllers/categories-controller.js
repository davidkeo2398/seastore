const { getProductCountByCategory } = require("../services/categories-service");
const { categoriesService } = require("../services/index");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const result = await categoriesService.getCategories();

      return res.status(200).json({
        message: "Get categories sucessully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get categories fail",
        data: [],
        error: error.message,
      });
    }
  },
  getProductCountByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      console.log("Category ID nhận được:", categoryId); // Log kiểm tra

      const result = await categoriesService.getProductCountByCategory(
        categoryId
      );
      if (!result) {
        return res.status(404).json({
          message: "Không tìm thấy danh mục sản phẩm",
          data: [],
        });
      }
      return res.status(200).json({
        message: "Get product count by category successfully",
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Get product count by category fail",
        error: error.message,
      });
    }
  },
};
