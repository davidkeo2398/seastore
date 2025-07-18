// const { Categories } = require("../../Model/Index");
// const { getCategoryById } = require("../categories-service");

// module.exports = {  
//     getCategories: async () => {
//         try {
//             const categories = await Categories.findAll();
//             return categories;
//         } catch (err) {
//             console.error("Lỗi khi lấy danh mục:", err);
//             throw new Error("Không thể lấy danh mục");
//         }
//     },
//     getCategoryById: async (categoryId) => {
//         try {
//             const category = await getCategoryById(categoryId);
//             return category;
//         } catch (error) {
//             console.error("Lỗi khi lấy danh mục:", error);
//             throw new Error("Không thể lấy danh mục");
//         }
//     },
//     createCategory: async (data) => {   
//         try {
//             const newCategory = await Categories.create(data);
//             return newCategory;
//         } catch (error) {
//             console.error("Lỗi khi tạo danh mục:", error);
//             throw new Error("Không thể tạo danh mục");
//         }
//     },
//     updateCategory: async (categoryId, data) => {
//         try {
//             const category = await Categories.findByPk(categoryId);
//             if (!category) {
//                 throw new Error("Không tìm thấy danh mục");
//             }
//             await category.update(data);
//             return category;
//         } catch (error) {
//             console.error("Lỗi khi cập nhật danh mục:", error);
//             throw new Error("Không thể cập nhật danh mục");
//         }
//     }
//     ,
//     deleteCategory: async (categoryId) => {
//         try {
//             const category = await Categories.findByPk(categoryId);
//             if (!category) {
//                 throw new Error("Không tìm thấy danh mục");
//             }
//             await category.destroy();
//             return category;
//         } catch (error) {
//             console.error("Lỗi khi xóa danh mục:", error);
//             throw new Error("Không thể xóa danh mục");
//         }
//     }
// }