const express = require("express");
const { orderAdminController } = require("../../controllers");
const { adminAuthMiddleware } = require("../../middleware");
const router = express.Router();

router.get("/",adminAuthMiddleware, orderAdminController.getOrders);
router.patch("/:order_id",adminAuthMiddleware, orderAdminController.updateStatusOrderById);

router.get("/:order_id", adminAuthMiddleware, orderAdminController.getOrderDetails);

module.exports = router;
