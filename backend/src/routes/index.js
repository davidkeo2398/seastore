const express = require("express");
const router = express.Router();

const authRoutes = require("./auth-route");
const orderRoutes = require("./order-route");
const productRoutes = require("./product-route");
const categoriesRoutes = require("./category-route");

const promotionRoutes = require("./promotion-route");
const agencyRoutes = require("./agency-route");
const agencyRankRoutes = require("./agency-rank-route");
const momoRoute = require("./momo-route");

//Authentication group api routes
router.use("/auth", authRoutes);
router.use("/order", orderRoutes);
router.use("/product", productRoutes);
router.use("/category", categoriesRoutes);

router.use("/promotion", promotionRoutes);
router.use("/agency", agencyRoutes);
router.use("/agency-rank", agencyRankRoutes);
router.use('/momo', momoRoute);

//admin
const adminRouter = express.Router();
const orderAdminRoutes = require("./admin/order-admin-route");
const userAdminRoutes = require("./admin/user-admin-route");

adminRouter.use("/order", orderAdminRoutes);
adminRouter.use("/user", userAdminRoutes);

module.exports = { router, adminRouter };
