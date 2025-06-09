'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456', 10); // default password for all users

    const admin1 = {
      user_name: 'kyle123',
      first_name: 'Kyle',
      last_name: 'Lee',
      email: 'kyleadmin@gmail.com',
      password: hashedPassword,
      phone: faker.phone.number('##########'),
      address: faker.location.streetAddress(),
      role_id: 1,
      resources: JSON.stringify({
        canView: true,
        canEdit: true,
        warehouse_id: null,
        agency_id: null,
        isSuperAdmin: true

      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const admin2 = {
      user_name: 'nametran123',
      first_name: 'Nam',
      last_name: 'Tran',
      email: 'namtran123@gmail.com',
      password: hashedPassword,
      phone: faker.phone.number('##########'),
      address: faker.location.streetAddress(),
      role_id: 1,
      resources: JSON.stringify({
        canView: true,
        canEdit: true,
        warehouse_id: null,
        agency_id: null,
        isSuperAdmin: true
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const adminWarehouse1 = {
      user_name: 'kyle321',
      first_name: 'Kyle',
      last_name: 'Lee',
      email: 'kyleadminwarehouse@gmail.com',
      password: hashedPassword,
      phone: faker.phone.number('##########'),
      address: faker.location.streetAddress(),
      role_id: 3,
      resources: JSON.stringify({
        canView: true,
        canEdit: true,
        warehouse_id: Math.floor(Math.random() * 10) + 1, // Random warehouse ID for admin_agency
        agency_id: Math.floor(Math.random() * 10) + 1,
        isSuperAdmin: false


      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const adminWarehouse2 = {
      user_name: 'nametran321',
      first_name: 'Nam',
      last_name: 'Tran',
      email: 'namtran321@gmail.com',
      password: hashedPassword,
      phone: faker.phone.number('##########'),
      address: faker.location.streetAddress(),
      role_id: 3,
      resources: JSON.stringify({
        canView: true,
        canEdit: true,
        warehouse_id: Math.floor(Math.random() * 10) + 1, // Random warehouse ID for admin_agency
        agency_id: Math.floor(Math.random() * 10) + 1,
        isSuperAdmin: false
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await queryInterface.bulkInsert('user', [admin1, admin2, adminWarehouse1, adminWarehouse2], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', {
      user_name: {
        [Sequelize.Op.in]: ['kyle123', 'nametran123', 'kyle321', 'nametran321']
      }
    }, {});
    await queryInterface.sequelize.query('ALTER TABLE user AUTO_INCREMENT = 1;');
  }
};
