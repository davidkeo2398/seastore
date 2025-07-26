const { Product, Categories, sequelize } = require("../Model/Index");
const Op = require("sequelize").Op;

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
  countProduct: async () => {
    try {
      return Product.count();
    } catch (err) {
      return 0;
    }
  },
  getProductById: async (product_id) => {
    try {
      const product = await Product.findByPk(product_id);
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
  getCountProductByCateory: async (category_id) => {
    try {
      const productCount = await Product.count({
        where: { category_id: category_id },
      });
      return productCount;
    } catch (err) {
      throw new Error("Get count product by category fail: ", err);
    }
  },

  // liệt kê sản phẩm có số lượng tồn kho nhỏ hơn 10
  getLowNumberInventory: async () => {
    try {
      const lowInventory = await Product.findAll({
        where: {
          number_of_inventory: {
            [Op.lt]: 10, // Số lượng tồn kho nhỏ hơn 10
          },
        },
        attributes: ["product_id", "product_name", "number_of_inventory"],
      });

      console.log("Low inventory products: ", lowInventory);
      return lowInventory;
    } catch (error) {
      throw new Error("Get low number inventory products fail: ", error);
    }
  },
  searchProductsForChatbot: async (searchString) => {
    try {
      // Tách chuỗi tìm kiếm thành một mảng các từ khóa
      const keywords = searchString.split(" ").filter((kw) => kw.length > 1);
      if (keywords.length === 0) {
        return [];
      }

      // Tạo điều kiện tìm kiếm động: mỗi từ khóa phải xuất hiện trong tên HOẶC mô tả
      const searchConditions = keywords.map((keyword) => ({
        [Op.or]: [
          { product_name: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } },
        ],
      }));

      const products = await Product.findAll({
        where: {
          [Op.and]: searchConditions, // Tất cả các điều kiện phải được thỏa mãn
        },
        include: [
          {
            model: Categories,
            as: "category",
            attributes: ["category_name"],
          },
        ],
        limit: 5,
      });

      // Định dạng lại dữ liệu trả về
      return products.map((p) => ({
        product_name: p.product_name,
        description: p.description,
        price: p.price,
        category_name: p.category ? p.category.category_name : "Không có",
      }));
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm cho chatbot:", error);
      return [];
    }
  },
  // nhấn danh mục hiển thị sản phẩm và mô tả danh mục
   getProductByDescriptionCategory: async (category_id) => {
    try {
      const products = await Product.findAll({
        where: { category_id: category_id },
        // lấy mô tả danh mục từ bảng Categories
        include: [
          {
            model: Categories,
            as: "category",
            attributes: ["description","category_name"],
          },
        ],
        attributes: ["product_id", "product_name", "price", "description"],
      });
      return products;
    } catch (err) {
      throw new Error("Get products by category fail: ", err);
    }
  },
  

};
