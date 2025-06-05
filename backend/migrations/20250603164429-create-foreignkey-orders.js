'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.changeColumn('orders', 'order_item_id', {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: 'orders_item',
    //     key: 'order_item_id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
    await queryInterface.changeColumn('orders', 'promotion_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'promotion',
        key: 'promotion_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.changeColumn('orders', 'order_item_id', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // });

    await queryInterface.changeColumn('orders',' promotion_id', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
