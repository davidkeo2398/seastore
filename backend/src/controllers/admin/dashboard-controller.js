const productService = require("../../services/product-service");
const orderService = require("../../services/order-service");
const userAdminService = require("../../services/admin/user-admin-service");
const warehouseAdminService = require("../../services/admin/warehouse-admin-service");

module.exports = {
  getDashboardStats: async (req, res) => {
    try {
      const [totalProducts, totalOrders, totalUsers] = await Promise.all([
        productService.countProduct(),
        orderService.countOrder(),
        userAdminService.countUser(),
        // warehouseAdminService.getWarehouses ? warehouseAdminService.getWarehouses() : [],
      ]);

      res.json({
        data: {
          totalProducts: totalProducts,
          totalOrders: totalOrders,
          totalUsers: totalUsers,
          // totalWarehouse: warehouses.length,
        },
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res
        .status(500)
        .json({ message: "Lỗi lấy số liệu dashboard", error: error.message });
    }
  },
};