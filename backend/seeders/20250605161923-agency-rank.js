'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('agency_rank', [
      {
        agency_rank_id: 1,
        agency_rank_name: 'Bronze',
        min_accumulated_value: 1000000,
        discount_percent: 10,
        note: "Hạng đồng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agency_rank_id: 2,
        agency_rank_name: 'Silver',
        min_accumulated_value: 5000000,
        discount_percent: 12,
        note: "Hạng bạc",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agency_rank_id: 3,
        agency_rank_name: 'Gold',
        min_accumulated_value: 10000000,
        discount_percent: 15,
        note: "Hạng vàng",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agency_rank_id: 4,
        agency_rank_name: 'Platinum',
        min_accumulated_value: 30000000,
        discount_percent: 17,
        note: "Hạng platinum",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agency_rank_id: 5,
        agency_rank_name: 'Diamond',
        min_accumulated_value: 40000000,
        discount_percent: 20,
        note: "Hạng kim cương",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('agency_rank', null, {});
    await queryInterface.sequelize.query('ALTER TABLE agency_rank AUTO_INCREMENT = 1;');
  }
};
