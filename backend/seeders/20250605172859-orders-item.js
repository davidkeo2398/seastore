'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const ordersItem = [];
    for (let i = 0; i < 10; i++) {
      ordersItem.push({
        product_id: Math.floor(Math.random() * 10) + 1, // Random product ID between 1 and 10
        order_id: Math.floor(Math.random() * 10) + 1, // Random order ID between 1 and 10
        warehouse_id: Math.floor(Math.random() * 10) + 1, // Random warehouse ID between 1 and 10
        quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 50
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('orders_item', ordersItem);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('orders_item', null, {});
    await queryInterface.sequelize.query('ALTER TABLE orders_item AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  }
};
