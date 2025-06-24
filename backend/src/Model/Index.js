const sequelize = require('../config/dbcontext').sequelize;
const RoleModel = require('./Role');
const UserModel = require('./User');
const OrderModdel = require('./Order');
const OrderItemModel = require('./OrderItem');
const CategoriesModel = require('./Categories');
const AgencyModel = require('./Agency');
const AgencyRankModel = require('./AgencyRank');
const WarehouseModel = require('./Warehouse');
const ProductModel = require('./Product');
const PromotionModel = require('./Promotion');

const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const Order = OrderModdel(sequelize);
const OrderItem = OrderItemModel(sequelize);
const Categories = CategoriesModel(sequelize);
const Agency = AgencyModel(sequelize);
const AgencyRank = AgencyRankModel(sequelize);
const Warehouse = WarehouseModel(sequelize);
const Product = ProductModel(sequelize);
const Promotion = PromotionModel(sequelize);

// User - Role
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

// User - Order
User.hasMany(Order, { foreignKey: 'iduser', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'iduser', as: 'user' });

// Order - OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Product - OrderItem
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Category - Product
Categories.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Categories, { foreignKey: 'category_id', as: 'category' });

// AgencyRank - Agency
AgencyRank.hasMany(Agency, { foreignKey: 'agency_rank_id', as: 'agencies' });
Agency.belongsTo(AgencyRank, { foreignKey: 'agency_rank_id', as: 'rank' });

// User - Agency (Assuming a user can be an agency)
User.hasOne(Agency, { foreignKey: 'iduser', as: 'agencyInfo' });
Agency.belongsTo(User, { foreignKey: 'iduser', as: 'userInfo' });

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
    Warehouse,
    Product,
    Promotion
};