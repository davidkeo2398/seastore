'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbcontext');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    otherPublicField;

    static associate(models) {
    }
  }
  User.init( {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^[0-9]+$/
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Role', // Assuming you have a Role model
                key: 'id'
            }
        },
        agency_rank_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'AgencyRank', // Assuming you have an AgencyRank model
                key: 'agency_rank_id'
            }
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
    }, {
    sequelize,
    modelName: 'UserTest',
  });
  return User;
};