'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const promotions = [];
    for (let i = 0; i < 10; i++) {
      promotions.push({
        promotion_name: `Giam gia ${faker.commerce.productName()}`,
        description: faker.lorem.sentence(),
        promotion_code: faker.string.alphanumeric(10).toUpperCase(), // Random promotion code
        promotion_price: faker.number.int({ min: 10000, max: 500000 }), // Random promotion price between 10,000 and 500,000
        promotion_percent: Math.floor(Math.random() * 50) + 1,
        promotion_created_date: faker.date.past().toISOString().slice(0, 10), // Random past date
        promotion_expired_date: faker.date.future().toISOString().slice(0, 10), // Random future date
        promotion_condition: faker.lorem.sentence(), // Random condition
        promotion_quantity: faker.number.int({ min: 1, max: 100 }), // Random quantity between 1 and 100
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('promotion', promotions);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('promotion', null, {});
    await queryInterface.sequelize.query('ALTER TABLE promotion AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
