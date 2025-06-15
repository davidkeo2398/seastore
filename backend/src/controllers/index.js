const authController = require('./authentication-controller');
const orderController = require('./order-controller');
const productController = require('./product-controller');
const categoriesController = require('./categories-controller');
const agencyController = require('./agency-controller');
const agencyRankController = require('./agency-rank-controller');
const promotionController = require('./promotion-controller');

module.exports = {
    authController,
    orderController,
    productController,
    categoriesController,
    agencyController,
    agencyRankController,
    promotionController
}