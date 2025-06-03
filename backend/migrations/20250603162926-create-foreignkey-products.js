'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'warehouse_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'warehouse',
        key: 'warehouse_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'category_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('products', 'agency_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'agency',
        key: 'agency_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'warehouse_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('products', 'agency_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
