'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const hashedPassword = await bcrypt.hash('123456', 10); // default password for all users

    // Generate 10 random users
    for (let i = 0; i < 10; i++) {
      users.push({
        user_name: `${faker.person.firstName().toLowerCase()}_${faker.person.lastName().toLowerCase()}`,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        phone: faker.phone.number('##########'),
        address: faker.location.streetAddress(),
        role_id: Math.floor(Math.random() * 3) + 1,
        resources: JSON.stringify({
          canView: true,
          canEdit: true,
          warehouse_id: Math.floor(Math.random() * 10) + 1,

        }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('user', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.sequelize.query('ALTER TABLE user AUTO_INCREMENT = 1;');
  }
};
