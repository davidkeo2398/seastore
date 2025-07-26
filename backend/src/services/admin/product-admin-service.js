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
      console.log("Fetching product with ID:", productId);

      const product = await Product.findByPk(productId);
      // include: [
      //   {
      //     model: Categories,
      //     as: "category",
      //     attributes: ["category_name"],
      //   },
      //   {
      //     model: Warehouse,
      //     as: "warehouse",
      //     attributes: ["warehouse_name"],
      //   },
      // ],

      console.log("Product details:", product);
      return product || null;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      throw new Error("Không thể lấy chi tiết sản phẩm");
    }
  },
  createProduct: async (productData) => {
    try {
      // Chỉ lấy các trường cần thiết để tạo sản phẩm
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
      } = productData;

      // Validate đơn giản phía service (nếu muốn)
      if (!product_name || !price || !category_id || !agency_id || !unit) {
        throw new Error("Thiếu thông tin bắt buộc khi tạo sản phẩm");
      }

      const newProduct = await Product.create({
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
      });
      return newProduct;
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
      throw new Error(error.message || "Không thể tạo sản phẩm");
    }
  },
  updateProduct: async (productId, updateData) => {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Không tìm thấy sản phẩm");
      }
      await product.update({
        product_name: updateData.product_name,
        price: updateData.price,
        description: updateData.description,
        old_price: updateData.old_price,
        image: updateData.image,
        category_id: updateData.category_id,
        agency_id: updateData.agency_id,
        warehouse_id: updateData.warehouse_id,
        unit: updateData.unit,
        number_of_inventory: updateData.number_of_inventory,
      });
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
