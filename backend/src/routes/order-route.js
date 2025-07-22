const express = require('express');
const router = express.Router();

const { orderController } = require('../controllers/index');
const { authMiddleware } = require('../middleware/index');
router.get('/', authMiddleware, orderController.getOrders);
router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-order', authMiddleware, orderController.getOrderByUser);
router.patch('/:order_id/status', authMiddleware, orderController.updateOrderStatus);

module.exports = router;