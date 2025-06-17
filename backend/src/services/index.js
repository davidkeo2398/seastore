
const authService = require('./auth-service');
const orderService = require('./order-service');
const productService = require('./product-service');
const categoriesService = require('./categories-service');
const promotionService = require('./promotion-service');
const agencyRankService = require('./agency-rank-service');
const agencyService = require('./agency-service');

//admin
const orderAdminService = require('./admin/order-admin-service');

module.exports = {
    authService,
    orderService,
    productService,
    categoriesService,
    promotionService,
    agencyRankService,
    agencyService,
    //admin
    orderAdminService,
};