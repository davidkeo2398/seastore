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
    // Cấu hình kết nối, tái sử dụng kết nối đỡ tốn tài nguyên
        pool: { 
            max: 5, // giới hạn kết nối tối đa
            min: 0, // số lượng kết nối tối thiểu
            acquire: 30000, // thời gian chờ tối đa để kết nối
            idle: 10000 // thời gian chờ tối đa khi không sử dụng kết nối
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
