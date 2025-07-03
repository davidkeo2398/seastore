const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");
// const { OrderItem } = require("./Index");

module.exports = (sequelize) => {
  class Order extends Model {
    otherPublicField;
  }

  Order.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Assuming you have a User model
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      address_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agency_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_agency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_agency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2), // Total amount with two decimal places
        allowNull: false,
        validate: {
          min: 0, // Total cannot be negative
        },
      },
      status: {
        type: DataTypes.ENUM('processing', 'completed'),
        allowNull: false,
        defaultValue: 'processing',
      },
      promotion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Promotion", // Assuming you have a Promotion model
          key: "promotion_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // If promotion is deleted, set to NULL
      },
      promotion_code: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //     is: /^[A-Z0-9]+$/ // Only uppercase letters and numbers allowed
        // }
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Default to current date and time
      },
      payment_method: {
        type: DataTypes.ENUM("cash", "paypal", "bank_transfer", "momo", "vnpay"),
        allowNull: false,
        defaultValue: "cash", // Default payment method
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "processing",
          "shipped",
          "completed",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending", // Default status
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
    }
  );

  // Define associations
  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: "order_id",
      as: "items",
    });
    Order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return Order;
};
// Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
