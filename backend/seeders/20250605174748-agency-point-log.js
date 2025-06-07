'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const agencyPointLogs = [];
    for (let i = 0; i < 10; i++) {
      agencyPointLogs.push({
        user_id: Math.floor(Math.random() * 10) + 1, // Random user ID between 1 and 10
        order_id: Math.floor(Math.random() * 10) + 1, // Random order ID between 1 and 10
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('agency_point_log', agencyPointLogs);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('agency_point_log', null, {});
    await queryInterface.sequelize.query('ALTER TABLE agency_point_log AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
