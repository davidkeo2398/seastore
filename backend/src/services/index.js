
const authService = require('./auth-service');
const orderService = require('./order-service');
const productService = require('./product-service');
const categoriesService = require('./categories-service');
const promotionService = require('./promotion-service');
const agencyRankService = require('./agency-rank-service');
const agencyService = require('./agency-service');
const momoService = require('./momo-service');
const vnpayService = require('./vnpay-service');

//admin
const orderAdminService = require('./admin/order-admin-service');
const productAdminService = require('./admin/product-admin-service')
const rankAdminService = require('./admin/rank-admin-service')
const userAdminService = require('./admin/user-admin-service')
const warehouseAdminService = require('./admin/warehouse-admin-service')
const categoryAdminService = require('./admin/category-admin-service');

module.exports = {
    authService,
    orderService,
    productService,
    categoriesService,
    promotionService,
    agencyRankService,
    agencyService,
    
    //Thanh toan ngan han
    vnpayService,
    momoService,

    //admin
    orderAdminService,
    productAdminService,
    rankAdminService,
    userAdminService,
    warehouseAdminService,
    categoryAdminService,
    rankAdminService
};