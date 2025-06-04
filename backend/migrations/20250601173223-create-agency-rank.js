'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agency_rank', {
      agency_rank_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      agency_rank_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      min_accumulated_value: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      discount_percent: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('agency_rank');
  }
};
