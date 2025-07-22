const express = require('express');
const router = express.Router();

const {orderItemController} = require('../controllers/index');
const {authMiddleware} = require('../middleware/index');

router.post('/', authMiddleware, orderItemController.createOrderItem);
router.get('/:order_id', authMiddleware, orderItemController.getOrderItemsByOrderId);
router.put('/:id', authMiddleware, orderItemController.updateOrderItem);
router.delete('/:id', authMiddleware, orderItemController.deleteOrderItem);
router.get('/product/:product_id', authMiddleware, orderItemController.getOrderItemsByProductId);

//admin
router.get('/admin/:order_id', authMiddleware, orderItemController.getOrderItemsByOrderId);
module.exports = router;
