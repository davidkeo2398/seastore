const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");

module.exports = (sequelize) => {
  class Categories extends Model {
    otherPublicField;
  }

  Categories.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 255], // Ensure the category name is not empty and has a reasonable length
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 500], // Optional description with a maximum length
        },
      },
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "categories",
      timestamps: true,
    }
  );
  Categories.associate = (models) => {
    Categories.hasMany(models.Product, {
      foreignKey: "category_id",
      as: "products",
    });
  };
  return Categories;
}; 
// Category - Product
// Categories.hasMany(Product, { foreignKey: "category_id", as: "products" });
// Product.belongsTo(Categories, { foreignKey: "category_id", as: "category" });
