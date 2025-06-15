
const authService = require('./auth-service');
const orderService = require('./order-service');
const productService = require('./product-service');
const categoriesService = require('./categories-service');
const agencyService = require('./agency-service');
const agencyRankService = require('./agency-rank-service');
const promotionService = require('./promotion-service');

module.exports = {
    authService,
    orderService,
    productService,
    categoriesService,
    agencyService,
    agencyRankService,
    promotionService
};