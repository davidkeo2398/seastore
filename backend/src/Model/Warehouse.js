const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");

module.exports = (sequelize) => {
  class Warehouse extends Model {
    otherPublicField;
  }

  Warehouse.init(
    {
      warehouse_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      warehouse_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255], // Ensure the address is not empty and has a reasonable length
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/, // Only numbers allowed
        },
      },
    },
    {
      sequelize,
      modelName: "Warehouse",
      tableName: "warehouse",
      timestamps: true,
    }
  );
  Warehouse.associate = (models) => {
    Warehouse.hasMany(models.Product, {
      foreignKey: 'warehouse_id',
      as: 'products',
    });
  };
  return Warehouse;
}; // Warehouse - Product
// Warehouse.hasMany(Product, { foreignKey: "warehouse_id", as: "products" });
// Product.belongsTo(Warehouse, { foreignKey: "warehouse_id", as: "warehouse" });
