const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-route');
const orderRoutes = require('./order-route');
const productRoutes = require('./product-route');
const categoriesRoutes = require('./category-route');
const promotionRoutes = require('./promotion-route');


//Authentication group api routes
router.use('/auth', authRoutes);
router.use('/order', orderRoutes)
router.use('/product', productRoutes);
router.use('/category', categoriesRoutes);
router.use('/promotion', promotionRoutes);

module.exports = router;