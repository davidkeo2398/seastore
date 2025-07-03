const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");

module.exports = (sequelize) => {
  class Agency extends Model {
    otherPublicField;
  }

  Agency.init(
    {
      agency_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      agency_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255], // Ensure the address is not empty and has a reasonable length
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/, // Only numbers allowed
        },
      },
      import_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          isInt: true, // Ensure it's an integer
          min: 0, // Ensure it's not negative
        },
      },
      export_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
          isInt: true, // Ensure it's an integer
          min: 0, // Ensure it's not negative
        },
      },
    },
    {
      sequelize,
      modelName: "Agency",
      tableName: "agency",
      timestamps: true,
    }
  );

  Agency.associate = (models) => {
    Agency.hasMany(models.AgencyRank, {
      foreignKey: "agency_rank_id",
      as: "rank",
    });
    Agency.belongsTo(models.User, { foreignKey: "user_id", as: "userInfo" });
  };
  return Agency;
};
