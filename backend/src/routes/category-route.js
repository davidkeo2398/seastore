const express = require('express');
const router = express.Router();

const { categoriesController } = require('../controllers/index');

router.get('/', categoriesController.getCategories);
router.get('/product-count/:categoryId', categoriesController.getProductCountByCategory);
// router.post('/', orderController.createOrder);

module.exports = router;