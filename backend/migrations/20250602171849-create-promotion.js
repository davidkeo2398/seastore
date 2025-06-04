'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('promotion', {
      promotion_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promotion_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      promotion_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      promotion_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      promotion_created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      promotion_expired_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      promotion_condition: {
        type: Sequelize.STRING,
        allowNull: false
      },
      promotion_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('promotion');
  }
};
