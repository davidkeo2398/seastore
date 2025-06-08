const express = require('express');
const router = express.Router();

const { orderController } = require('../controllers/index');

router.get('/', orderController.getOrders);
router.post('/', orderController.createOrder);

module.exports = router;