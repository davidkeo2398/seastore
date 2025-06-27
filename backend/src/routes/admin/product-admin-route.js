const express = require("express");
const { productAdminController} = require("../../controllers/admin");
const { adminAuthMiddleware } = require("../../middleware");
const router = express.Router();

router.get("/", adminAuthMiddleware, productAdminController.getProducts);
router.post("/", adminAuthMiddleware, productAdminController.createProduct);
router.get("/:id", adminAuthMiddleware, productAdminController.getProductById);
router.put("/:id", adminAuthMiddleware, productAdminController.updateProduct);
router.delete("/:id", adminAuthMiddleware, productAdminController.deleteProduct);

module.exports = router; 