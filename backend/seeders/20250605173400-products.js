'use strict';

const { faker } = require('@faker-js/faker');
const path = require('path');
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const productsPath = path.join(__dirname, '../JSON/products.js');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsData);
    // for (let i = 0; i < 10; i++) {
    //   products.push({
    //     product_name: faker.commerce.productName(),
    //     description: faker.commerce.productDescription(),
    //     category_id: Math.floor(Math.random() * 10) + 1, // Random category ID between 1 and 10
    //     agency_id: Math.floor(Math.random() * 10) + 1, // Random agency ID between 1 and 10
    //     price: parseFloat(faker.commerce.price(10, 100, 2)), // Random price between 10 and 100
    //     unit: faker.helpers.arrayElement(['kg', 'g', 'litre', 'piece']), // Random unit
    //     old_price: parseFloat(faker.commerce.price(10, 100, 2)), // Random old price between 10 and 100
    //     image: faker.image.urlLoremFlickr({ category: 'food', width: 640, height: 480 }),
    //     warehouse_id: Math.floor(Math.random() * 10) + 1, // Random warehouse ID between 1 and 10
    //     number_of_inventory: Math.floor(Math.random() * 100) + 1, // Random inventory number between 1 and 100
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   });
    // }
    await queryInterface.bulkInsert('products', products);
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.sequelize.query('ALTER TABLE products AUTO_INCREMENT = 1;');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};
