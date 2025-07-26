const express = require("express");
const router = express.Router();

const { productController } = require ("../controllers/index")
//router.get("/low-inventory", productController.getLowNumberInventory);


router.get("/", productController.getProducts);
router.get("/:product_id", productController.getProductById);
router.get(
  "/category/:category_id",
  productController.getProductByCategory
);
router.get(
  "/category-count/:category_id",
  productController.getCountProductByCateory
);
router.get("/category-description/:category_id", productController.getProductByDescriptionCategory);


// router.post('/', orderController.createOrder);

module.exports = router;
