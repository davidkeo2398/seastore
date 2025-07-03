const productService = require("../../services/product-service");
const orderService = require("../../services/order-service");
const userAdminService = require("../../services/admin/user-admin-service");
const warehouseAdminService = require("../../services/admin/warehouse-admin-service");

module.exports = {
  getDashboardStats: async (req, res) => {
    try {
      const [products, orders, users, warehouses] = await Promise.all([
        productService.getProducts(),
        orderService.getOrders(),
        userAdminService.getUsers(),
        warehouseAdminService.getWarehouses ? warehouseAdminService.getWarehouses() : [],
      ]);
      res.json({
        data: {
          totalProducts: products.length,
          totalOrders: orders.length,
          totalUsers: users.length,
          totalWarehouse: warehouses.length,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi lấy số liệu dashboard", error: error.message });
    }
  },
}; 