'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('orders_item', 'product_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'product_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.changeColumn('orders_item', 'warehouse_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'warehouse',
        key: 'warehouse_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('orders_item', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('orders_item', 'warehouse_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
