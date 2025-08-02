const orderAdminService = require("./order-admin-service");
const userAdminService = require("./user-admin-service");
const productAdminService = require("./product-admin-service")
const warehouseAdminService = require("./warehouse-admin-service");
const rankAdminService = require("./rank-admin-service");
const categoryAdminService = require("./category-admin-service");
const promotionAdminService = require("./promotion-admin-service");

module.exports = {
    orderAdminService,
    userAdminService,
    productAdminService,
    warehouseAdminService,
    categoryAdminService,
    rankAdminService,
    promotionAdminService
}; 