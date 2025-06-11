const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-route');
const orderRoutes = require('./order-route');
const productRoutes = require('./product-route');
const categoriesRoutes = require('./category-route');
const agencyRoutes = require('./agency-route');
const agencyRankRoutes = require('./agencyrank-route');



//Authentication group api routes
router.use('/auth', authRoutes);
router.use('/order', orderRoutes)
router.use('/product', productRoutes);
router.use('/category', categoriesRoutes);
router.use('/agency',agencyRoutes);
router.use('/agency-rank',agencyRankRoutes);


module.exports = router;