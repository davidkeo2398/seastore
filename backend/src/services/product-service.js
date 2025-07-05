const { Product } = require("../Model/Index");

module.exports = {
  createProduct: async (productData) => {
    const t = await sequelize.transaction();
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
      } = productData;

      // Validate các trường bắt buộc
      if (!product_name || !price || !category_id || !agency_id || !unit) {
        throw new Error("Thiếu thông tin bắt buộc khi tạo sản phẩm");
      }

      // Tạo sản phẩm mới trong transaction
      const newProduct = await Product.create(
        {
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
        },
        { transaction: t }
      );

      // Nếu muốn xử lý thêm logic liên quan (ví dụ: cập nhật kho, log, ...), làm ở đây

      await t.commit();
      return newProduct;
    } catch (error) {
      await t.rollback();
      console.error("Lỗi khi tạo sản phẩm:", error);
      throw new Error(error.message || "Không thể tạo sản phẩm");
    }
  },
  getProducts: async () => {
    try {
      const products = Product.findAll();
      return products;
    } catch (err) {
      throw new Error("Get products failure: ", err);
    }
  },
  getProductById: async (product_id) => {
    try {
      const product = Product.findOne({ where: { product_id: product_id } });
      return product;
    } catch (err) {
      throw new Error("Get a product fail: ", err);
    }
  },
  getProductByCategory: async (category_id) => {
    try {
      const products = Product.findAll({ where: { category_id: category_id } });
      return products;
    } catch (err) {
      throw new Error("Get products by category fail: ", err);
    }
  },
  
}
