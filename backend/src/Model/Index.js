const sequelize = require('../config/dbcontext').sequelize;
const UserModel = require('./User');

const User = UserModel(sequelize);

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
    User
};