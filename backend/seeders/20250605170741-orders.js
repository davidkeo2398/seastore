'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const now = new Date();
    const order_code = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}${String(now.getMilliseconds()).padStart(3, '0')}`;


    const orders = [];
    for (let i = 0; i < 10; i++) {
      orders.push({
        order_code: order_code,
        // order_item_id: Math.floor(Math.random() * 10) + 1,
        user_id: Math.floor(Math.random() * 10) + 1,
        user_name: `${faker.person.firstName()}_${faker.person.lastName()}`,
        full_name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        user_email: faker.internet.email(),
        address_user: faker.location.streetAddress(),
        phone_user: faker.phone.number('##########'),
        agency_name: faker.company.name(),
        address_agency: faker.location.streetAddress(),
        phone_agency: faker.phone.number('##########'),
        total: (Math.random() * 100).toFixed(2), // Random total between 0 and 100
        promotion_id: Math.floor(Math.random() * 10) + 1, // Random promotion ID between 1 and 10
        order_date: faker.date.past().toISOString().slice(0, 19).replace('T', ' '),
        payment_method: faker.helpers.arrayElement(['cash', 'paypal', 'bank_transfer', 'momo', 'vnpay']),
        promotion_code: faker.string.alphanumeric(10), // Random alphanumeric code
        status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled']),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('orders', orders);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.sequelize.query('ALTER TABLE orders AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
