const { productAdminService } = require("../../services");


module.exports = {
  getProducts: async (req, res) => {
    try {
      const result = await productAdminService.getProducts();
      res
        .status(200)
        .json({ message: "Lấy danh sách sản phẩm thành công", data: result });
    } catch (error) {
      res.status(400).json({
        message: "Lấy danh sách sản phẩm thất bại",
        error: error.message,
      });
    }
  },

  getProductById: async (req, res) => {
    try {
      const result = await productAdminService.getProductById(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res
        .status(200)
        .json({ message: "Lấy chi tiết sản phẩm thành công", data: result });
    } catch (error) {
      res.status(400).json({
        message: "Lấy chi tiết sản phẩm thất bại",
        error: error.message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_name,
        price,
        description,
        old_price,
        image,
        category_id,
        agency_id,
        warehouse_id,
        unit,
        number_of_inventory,
        status
      } = req.body;

      if (!product_name || !price || !category_id || !agency_id || !unit) {
        throw new Error("Thiếu thông tin bắt buộc khi tạo sản phẩm");
      }

      const result = await productAdminService.createProduct({
        product_name,
        price,
        description,
        old_price,
        image,
        category_id,
        agency_id: agency_id || 1, // Mặc định là 1 nếu không có giá trị
        warehouse_id: warehouse_id || 1, // Mặc định là 1 nếu không có giá trị
        unit,
        number_of_inventory,
        status
      });
      res
        .status(201)
        .json({ message: "Tạo sản phẩm thành công", data: result });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Tạo sản phẩm thất bại", error: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      console.log("Dữ liệu nhận được để cập nhật:", req.body);
      const result = await productAdminService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Cập nhật sản phẩm thất bại", error: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const result = await productAdminService.deleteProduct(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: "Xoá sản phẩm thất bại" });
    }
  },
};
