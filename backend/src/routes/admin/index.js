const express = require("express");

const adminRouter = express.Router();
const orderAdminRoutes = require("./order-admin-route");
const userAdminRoutes = require("./user-admin-route");
const productAdminRoutes = require("./product-admin-route");
const rankAdminRoutes = require("./rank-admin-route");
const warehouseAdminRoutes = require("./warehouse-admin-route");

adminRouter.use("/order", orderAdminRoutes);
adminRouter.use("/user", userAdminRoutes);
adminRouter.use("/products", productAdminRoutes);
adminRouter.use("/rank", rankAdminRoutes);
adminRouter.use("/warehouse", warehouseAdminRoutes);
module.exports = { adminRouter };
