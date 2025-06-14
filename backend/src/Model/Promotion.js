const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbcontext');

module.exports = (sequelize) => {
    class Promotion extends Model {
        otherPublicField;
    }

    Promotion.init(
        {
            promotion_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            promotion_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            promotion_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
            promotion_price: {
                type: DataTypes.STRING,
                allowNull: false
            },
            promotion_percent: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 5
            },
            promotion_expired_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            promotion_created_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            promotion_condition: {
                type: DataTypes.STRING,
                allowNull: true
            },
            promotion_quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Promotion',
            tableName: 'promotion',
            timestamps: true
        }
    );
    return Promotion;
}