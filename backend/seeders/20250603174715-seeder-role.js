'use strict';

// tạo dữ liệu mẫu cho bảng role
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role', [
      {
        role_name: 'admin',         // Exact match with ENUM value
        agency_rank_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'user',          // Exact match with ENUM value
        agency_rank_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'admin_agency',  // Exact match with ENUM value
        agency_rank_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('role', null, {});
    await queryInterface.sequelize.query('ALTER TABLE role AUTO_INCREMENT = 1;');
  }
};
