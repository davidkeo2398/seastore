const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");

module.exports = (sequelize) => {
  class OrderItem extends Model {
    otherPublicField;
  }

  OrderItem.init(
    {
      order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Product", // Assuming you have a Product model
          key: "product_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Order", // Assuming you have an Order model
          key: "order_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Warehouse", // Assuming you have a Warehouse model
          key: "warehouse_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1, // Quantity must be at least 1
        },
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "orders_item",
      timestamps: true,
    }
  );
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product", // Alias phải khớp với phần include trong truy vấn
    });
  };
  return OrderItem;
};
