'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const agencys = [];
    for (let i = 0; i < 10; i++) {
      agencys.push({
        agency_name: faker.company.name(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number('##########'),
        import_price: faker.number.int({ min: 1000000, max: 5000000 }), // Random import price between 1,000,000 and 5,000,000
        export_price: faker.number.int({ min: 1000000, max: 5000000 }), // Random export price between 1,000,000 and 5,000,000
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('agency', agencys);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('agency', null, {});
    await queryInterface.sequelize.query('ALTER TABLE agency AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
