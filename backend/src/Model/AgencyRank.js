const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbcontext");

module.exports = (sequelize) => {
  class AgencyRank extends Model {
    otherPublicField;
  }

  AgencyRank.init(
    {
      agency_rank_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        // references: {
        //   model: "agency_rank", // tên bảng tham chiếu
        //   key: "agency_rank_id", // khóa chính của bảng tham chiếu
        // },
      },
      agency_rank_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      min_accumulated_value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      discount_percent: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AgencyRank",
      tableName: "agency_rank",
      timestamps: true,
    }
  );
  AgencyRank.associate = (models) => {
    AgencyRank.hasMany(models.User, {
      foreignKey: "agency_rank_id",
      as: "users",
    });
  };
  return AgencyRank;
};

async function validateRanks() {
  const ranks = await AgencyRank.findAll();
  console.log("Danh sách hạng:", ranks);
}
