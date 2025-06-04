const sequelize = require('../config/dbcontext').sequelize;
const UserModel = require('./User');

const User = UserModel(sequelize);

module.exports = {
    User
};