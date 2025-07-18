// const categoryAdminService = require("../../services/admin/category-admin-service"); 
// const { getCategoryById } = require("../../services/categories-service");

// module.exports = {
//   getCategories: async (req, res) => {
//     try {
//       const categories = await categoryAdminService.getCategories();
//       res.json({ data: categories });
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       res.status(500).json({ message: "Lỗi khi lấy danh mục", error: error.message });
//     }
//   },
//   getCategoryById: async (req, res) => {
//     try {
//       const categoryId = req.params.id;
//       const category = await getCategoryById(categoryId);
//       res.json({ data: category });
//     } catch (error) {
//       console.error("Error fetching category by ID:", error);
//       res.status(500).json({ message: "Lỗi khi lấy danh mục", error: error.message });
//     }
//   },
//   createCategory: async (req, res) => {
//     try {
//       const categoryData = req.body;
//       const newCategory = await categoryAdminService.createCategory(categoryData);
//       res.status(201).json({ data: newCategory });
//     } catch (error) {
//       console.error("Error creating category:", error);
//       res.status(500).json({ message: "Lỗi khi tạo danh mục", error: error.message });
//     }
//   },        
//     updateCategory: async (req, res) => {
//         try {
//         const categoryId = req.params.id;
//         const categoryData = req.body;
//         const updatedCategory = await categoryAdminService.updateCategory(categoryId, categoryData);
//         res.json({ data: updatedCategory });
//         } catch (error) {
//         console.error("Error updating category:", error);
//         res.status(500).json({ message: "Lỗi khi cập nhật danh mục", error: error.message });
//         }
//     },
//     deleteCategory: async (req, res) => {
//         try {
//         const categoryId = req.params.id;
//         const result = await categoryAdminService.deleteCategory(categoryId);
//         res.json({ data: result });
//         } catch (error) {
//         console.error("Error deleting category:", error);
//         res.status(500).json({ message: "Lỗi khi xóa danh mục", error: error.message });
//         }
//     }
// };