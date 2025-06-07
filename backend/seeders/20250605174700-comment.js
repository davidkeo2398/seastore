'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const comments = [];
    for (let i = 0; i < 10; i++) {
      comments.push({
        comment_content: faker.lorem.sentence(),
        rate: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('comment', comments);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('comment', null, {});
    await queryInterface.sequelize.query('ALTER TABLE comment AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
