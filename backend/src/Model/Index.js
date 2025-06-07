const sequelize = require('../config/dbcontext').sequelize;
const RoleModel = require('./Role');
const UserModel = require('./User');
const OrderModdel = require('./Order');
const OrderItemModel = require('./OrderItem');
const CategoriesModel = require('./Categories');
const AgencyModel = require('./Agency');
const AgencyRankModel = require('./AgencyRank');
const WarehouseModel = require('./Warehouse');

const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const Order = OrderModdel(sequelize);
const OrderItem = OrderItemModel(sequelize);
const Categories = CategoriesModel(sequelize);
const Agency = AgencyModel(sequelize);
const AgencyRank = AgencyRankModel(sequelize);
const Warehouse = WarehouseModel(sequelize);

// Sync all models
sequelize.sync()
    .then(() => {
        console.log('Database & tables synced');
    })
    .catch((err) => {
        console.log('Error syncing database:', err);
    });

module.exports = {
    sequelize,
    User,
    Role,
    Order,
    OrderItem,
    Categories,
    Agency,
    AgencyRank,
    Warehouse
};