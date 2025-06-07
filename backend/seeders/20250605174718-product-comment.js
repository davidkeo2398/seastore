'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const productComments = [];
    for (let i = 0; i < 10; i++) {
      productComments.push({
        product_id: Math.floor(Math.random() * 10) + 1, // Random product ID between 1 and 10
        comment_id: Math.floor(Math.random() * 10) + 1, // Random comment ID between 1 and 10
        user_id: Math.floor(Math.random() * 10) + 1, // Random user ID between 1 and 10
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('product_comment', productComments);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('product_comment', null, {});
    await queryInterface.sequelize.query('ALTER TABLE product_comment AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
