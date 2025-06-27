const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");

module.exports = (sequelize) => {
  class Role extends Model {
    otherPublicField;
  }

  Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.ENUM("admin", "user", "admin_agency"),
        allowNull: false,
      },
      agency_rank_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "AgencyRank", // Assuming you have an AgencyRank model
          key: "agency_rank_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "role",
      timestamps: true,
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "role_id",
      as: "users",
    });
  };
  return Role;
};

// User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
