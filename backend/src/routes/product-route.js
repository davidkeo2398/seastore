const express = require('express');
const router = express.Router();

const { productController } = require('../controllers/index');

router.get('/', productController.getProducts);
// router.post('/', orderController.createOrder);

module.exports = router;