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
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// **BỔ SUNG MỐI QUAN HỆ CÒN THIẾU GIỮA USER VÀ AGENCYRANK**
User.belongsTo(AgencyRank, { foreignKey: 'agency_rank_id', as: 'agencyRank' });
AgencyRank.hasMany(User, { foreignKey: 'agency_rank_id', as: 'usersWithThisRank' }); // Thêm một alias khác để tránh trùng lặp

// Order - OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Product - OrderItem
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Category - Product
Categories.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Categories, { foreignKey: 'category_id', as: 'category' });

// Warehouse - Product
Warehouse.hasMany(Product, { foreignKey: 'warehouse_id', as: 'products' });
Product.belongsTo(Warehouse, { foreignKey: 'warehouse_id', as: 'warehouse' });

// AgencyRank - Agency
AgencyRank.hasMany(Agency, { foreignKey: 'agency_rank_id', as: 'agencies' });
Agency.belongsTo(AgencyRank, { foreignKey: 'agency_rank_id', as: 'rank' });

// User - Agency
User.hasOne(Agency, { foreignKey: 'user_id', as: 'agencyInfo' });
Agency.belongsTo(User, { foreignKey: 'user_id', as: 'userInfo' });
// --- KẾT THÚC ---

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