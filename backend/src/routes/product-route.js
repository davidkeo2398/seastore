const express = require('express');
const router = express.Router();

const { productController } = require('../controllers/index');

router.get('/', productController.getProducts);
router.get('/:product_id', productController.getProductById);
router.get('/category/:category_id', productController.getProductByCategory);
// router.post('/', orderController.createOrder);

module.exports = router;