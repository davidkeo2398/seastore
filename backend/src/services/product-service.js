const { Product } = require("../Model/Index");
const { Op } = require("sequelize");

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
  getProducts: async (search, page = 1, limit = 30) => {
    console.log("Get products with params:", { search, page, limit });
    try {
      const where = {};
      if (search && search.trim() !== "") {
        Object.assign(where, {
          [Op.or]: [
            { product_name: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        });
      }
      console.log("Search condition:", where);
      const offset = (page - 1) * limit; // tính toán trang hiện tại
      console.log("Offset:", offset);
      console.log("Limit:", limit);
      const { count, rows } = await Product.findAndCountAll({
        where,
        limit,
        offset,
      });
      console.log("Count:", count);

      console.log("Rows:", rows);
      console.log("page:", page);
      return {
        rows: rows.map((product) => ({
          product_id: product.product_id,
          product_name: product.product_name,
          price: product.price,
          description: product.description,
          old_price: product.old_price,
          image: product.image,
          category_id: product.category_id,
          agency_id: product.agency_id,
          warehouse_id: product.warehouse_id,
          unit: product.unit,
          number_of_inventory: product.number_of_inventory,
        })),
        totalPages: Math.ceil(count / limit),
        totalElements: count,
      };
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
};
