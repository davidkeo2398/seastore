const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");
// const { Order } = require("./Index");

// sequelize.define('User',
//     {
//         user_id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         user_name: {
//             type: DataTypes.STRING,
//             allowNull: false

//         },

//     }
// );

module.exports = (sequelize) => {
  class User extends Model {
    otherPublicField;
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[0-9]+$/,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2, // Default role is 'user'
        references: {
          model: "Role", // Assuming you have a Role model
          key: "role_id",
        },
      },
      agency_rank_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "AgencyRank", // Assuming you have an AgencyRank model
          key: "agency_rank_id",
        },
      },
      resources: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
    User.hasOne(models.Agency, { foreignKey: "user_id", as: "agencyInfo" });
    User.belongsTo(models.Role, { foreignKey: "role_id", as: "role" });
    User.belongsTo(models.AgencyRank, {
      foreignKey: "agency_rank_id",
      as: "agencyRank",
    });
  };
  return User;
};
