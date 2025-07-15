const mysql = require('mysql');
const { Sequelize } = require('sequelize');
require('dotenv').config();



const sequelize = new Sequelize(
    process.env.DB_NAME || 'sea_store',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


// module.exports = {db, sequelize};
module.exports = { sequelize};
