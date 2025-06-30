const { Product, Warehouse, Categories } = require("../../Model/Index");

module.exports = {
  getProducts: async () => {
    try {
      const product = await Product.findAll();
      return product;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      throw new Error("Không thể lấy danh sách sản phẩm");
    }
  },

  getProductById: async (productId) => {
    try {
      const product = await Product.findByPk(product_id, {
        include: [
          {
            model: Categories,
            as: "category",
            attributes: ["category_name"],
          },
          {
            model: Warehouse,
            as: "warehouse",
            attributes: ["warehouse_name"],
          },
        ],
      });
      return productId ? product : null; // Trả về null nếu không tìm thấy sản phẩm
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      throw new Error("Không thể lấy chi tiết sản phẩm");
    }
  },
  createProduct: async (productData) => {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      throw new Error("Không thể tạo sản phẩm");
    }
  },
  updateProduct: async (productId, updateData) => {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Không tìm thấy sản phẩm");
      }
      await product.update(updateData);
      return product;
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      throw new Error("Không thể cập nhật sản phẩm");
    }
  },
  deleteProduct: async (productId) => {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Không tìm thấy sản phẩm");
      }
      await product.destroy(); // xóa bản ghi tương ứng với đối tượng model hiện tại
      return { message: "Xóa sản phẩm thành công" };
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      throw new Error("Không thể xóa sản phẩm");
    }
  },
};
