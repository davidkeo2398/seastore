// const { productAdminService } = require("../../services");
const productAdminService = require("../../services/admin/product-admin-service");


module.exports = {
  // getProducts : async (req, res) => {
  //   try {
  //     const page = parseInt(req.query.page) || 1;
  //     const limit = parseInt(req.query.limit) || 10;

  //     // const result = await productAdminService.getProductsPaginated(page, limit);
  //     const result = await productAdminService.getProductsPaginated(page, limit);
  //     if (!result || result.data.length === 0) {
  //       return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  //     }

  //     res.status(200).json({
  //       message: "Lấy danh sách sản phẩm thành công",
  //       data: result,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       message: "Lỗi khi lấy danh sách sản phẩm",
  //       error: error.message,
  //     });
  //   }
  // },
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
        agency_id,
        warehouse_id,
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
