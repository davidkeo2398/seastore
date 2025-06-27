const authController = require("./authentication-controller");
const orderController = require("./order-controller");
const productController = require("./product-controller");
const categoriesController = require("./categories-controller");
const promotionController = require("./promotion-controller");
const agencyController = require("./agency-controller");
const agencyRankController = require("./agency-rank-controller");
const momoController = require("./momo-controller");

//admin
const orderAdminController = require("./admin/order-admin-controller");
const productAdminController = require("./admin/product-admin-controller");
const agencyRankAdminController = require("./admin/rank-admin-controller");
const userAdminController = require("./admin/user-admin-controller");
const warehouseAdminController = require("./admin/warehouse-admin-controller");

module.exports = {
  authController,
  orderController,
  productController,
  categoriesController,
  promotionController,
  agencyController,
  agencyRankController,
  //admin
  orderAdminController,
  productAdminController,
  agencyRankAdminController,
  userAdminController,
  warehouseAdminController,
  momoController,
};
