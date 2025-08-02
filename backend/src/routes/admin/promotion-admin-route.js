const { promotionAdminController } = require("../../controllers/admin");
const { adminAuthMiddleware } = require("../../middleware");
const express = require("express");
const router = express.Router();

router.get("/", adminAuthMiddleware, promotionAdminController.getPromotions);
router.post("/", adminAuthMiddleware, promotionAdminController.createPromotion);
router.get("/:id", adminAuthMiddleware, promotionAdminController.getPromotionById);
router.put("/:id", adminAuthMiddleware, promotionAdminController.updatePromotion);
router.delete("/:id", adminAuthMiddleware, promotionAdminController.deletePromotion);


module.exports = router;
