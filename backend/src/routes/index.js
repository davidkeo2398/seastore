const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-route');
const orderRoutes = require('./order-route');
const productRoutes = require('./product-route');
const categoriesRoutes = require('./category-route');
const promotionRoutes = require('./promotion-route');
const agencyRoutes = require('./agency-routes');
const agencyRankRoutes = require('./agency-rank-routes');


//Authentication group api routes
router.use('/auth', authRoutes);
router.use('/order', orderRoutes)
router.use('/product', productRoutes);
router.use('/category', categoriesRoutes);
router.use('/promotion', promotionRoutes);
router.use('/agency', agencyRoutes);
router.use('/agency-rank', agencyRankRoutes);

module.exports = router;