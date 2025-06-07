const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbcontext');

module.exports = (sequelize) => {
    class AgencyRank extends Model {
        otherPublicField;
    }

    AgencyRank.init(
        {
            agency_rank_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            agency_rank_name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            min_accumulated_value: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            discount_percent: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            note: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            sequelize,
            modelName: 'AgencyRank',
            tableName: 'agency_rank',
            timestamps: true
        }
    );
    return AgencyRank;
}