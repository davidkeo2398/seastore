const { where } = require("sequelize");
const { Categories, Product, sequelize } = require("../Model/Index");

module.exports = {
  getCategories: async () => {
    try {
      const categories = Categories.findAll();
      return categories;
    } catch (err) {
      throw new Error("Get categories failure: ", err);
    }
  },
  getProductCountByCategory: async (categoryId) => {
    try {
      console.log("Thực hiện truy vấn với categoryId:", categoryId); // Log kiểm tra

      const productCount = await Categories.findOne({
        where: {
          category_id: categoryId,
        },
        attributes: [
          "category_id",
          "category_name",
          [
            sequelize.fn("COUNT", sequelize.col("Products.product_id")),
            "product_count",
          ],
        ],
        include: [
          {
            model: Product,
            as: "products", // khớp Categories.associate
            attributes: [], // Không cần lấy thông tin sản phẩm
          },
        ],
      });

      if (!productCount) {
        console.log("Không tìm thấy danh mục với categoryId:", categoryId); // Log kiểm tra
        return null; // Trả về null nếu không tìm thấy
      }

      console.log("Kết quả truy vấn:", productCount); // Log kết quả
      return productCount;
    } catch (error) {
      console.error("Lỗi khi lấy số lượng sản phẩm theo danh mục:", error); // Log lỗi
      throw new Error("Không thể lấy số lượng sản phẩm theo danh mục");
    }
  },

  // chọn danh mục và show tât cả sản phẩm trong danh mục đó
  



  // test

  //     getCategoryById: async (categoryId) => {
  //     try {
  //       const category = await Categories.findByPk(categoryId);
  //       if (!category) {
  //         throw new Error("Không tìm thấy danh mục");
  //       }
  //       return category;
  //     } catch (error) {
  //       console.error("Lỗi khi lấy danh mục:", error);
  //       throw new Error("Không thể lấy danh mục");
  //     }
  //   },

  //   createCategory: async (data) => {
  //     try {
  //       const newCategory = await Categories.create(data);
  //       return newCategory;
  //     } catch (error) {
  //       console.error("Lỗi khi tạo danh mục:", error);
  //       throw new Error("Không thể tạo danh mục");
  //     }
  //   },

  //   updateCategory: async (categoryId, data) => {
  //     try {
  //       const category = await Categories.findByPk(categoryId);
  //       if (!category) {
  //         throw new Error("Không tìm thấy danh mục");
  //       }
  //       await category.update(data);
  //       return category;
  //     } catch (error) {
  //       console.error("Lỗi khi cập nhật danh mục:", error);
  //       throw new Error("Không thể cập nhật danh mục");
  //     }
  //   },

  //   deleteCategory: async (categoryId) => {
  //     try {
  //       const category = await Categories.findByPk(categoryId);
  //       if (!category) {
  //         throw new Error("Không tìm thấy danh mục");
  //       }
  //       await category.destroy();
  //       return { message: "Xóa danh mục thành công" };
  //     } catch (error) {
  //       console.error("Lỗi khi xóa danh mục:", error);
  //       throw new Error("Không thể xóa danh mục");
  //     }
  //   },
};
