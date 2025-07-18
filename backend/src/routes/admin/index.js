const express = require("express");
const { dashboardController } = require("../../controllers/admin");

const adminRouter = express.Router();
const orderAdminRoutes = require("./order-admin-route");
const userAdminRoutes = require("./user-admin-route");
const productAdminRoutes = require("./product-admin-route");
const rankAdminRoutes = require("./rank-admin-route");
const warehouseAdminRoutes = require("./warehouse-admin-route");
// const categoryAdminRoutes = require("./category-admin-route");

adminRouter.use("/order", orderAdminRoutes);
adminRouter.use("/user", userAdminRoutes);
adminRouter.use("/products", productAdminRoutes);
adminRouter.use("/rank", rankAdminRoutes);
// adminRouter.use("/categories", categoryAdminRoutes);
adminRouter.use("/warehouse", warehouseAdminRoutes);
adminRouter.get("/dashboard-stats", dashboardController.getDashboardStats);
module.exports = { adminRouter };
