'use strict';

const { faker } = require('@faker-js/faker');
const path = require('path');
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const categoriesPath = path.join(__dirname, '../JSON/categories.js');
    const categoriesData = fs.readFileSync(categoriesPath, 'utf8');
    const categories = JSON.parse(categoriesData);
    // for (let i = 0; i < 10; i++) {
    //   categories.push({
    //     category_name: faker.commerce.department(),
    //     description: faker.lorem.sentence(),
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   });
    // }
    await queryInterface.bulkInsert('categories', categories);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.sequelize.query('ALTER TABLE categories AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
