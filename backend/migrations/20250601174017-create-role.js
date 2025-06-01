'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Role', {
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role_name: {
        type: Sequelize.ENUM('admin', 'user', 'admin_agency'),
        allowNull: false,
      },
      agency_rank_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'AgencyRank', // Assuming you have an AgencyRank model
          key: 'agency_rank_id'
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
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Role');
  }
};
