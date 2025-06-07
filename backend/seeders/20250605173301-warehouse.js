'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const warehouses = [];
    for (let i = 0; i < 10; i++) {
      warehouses.push({
        warehouse_name: faker.airline.recordLocator(),
        address: faker.location.streetAddress(),
        phone_number: faker.phone.number('##########'),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('warehouse', warehouses);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('warehouse', null, {});
    await queryInterface.sequelize.query('ALTER TABLE warehouse AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
