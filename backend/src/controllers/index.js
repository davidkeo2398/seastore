const authController = require('./authentication-controller');
const orderController = require('./order-controller');
const productController = require('./product-controller');
const categoriesController = require('./categories-controller');
const promotionController = require('./promotion-controller');
const agencyController = require('./agency-controller');
const agencyRankController = require('./agency-rank-controller');

//admin
const  orderAdminController = require('./admin/order-admin-controller');

module.exports = {
    authController,
    orderController,
    productController,
    categoriesController,
    promotionController,
    agencyController,
    agencyRankController,
    //admin
    orderAdminController
}