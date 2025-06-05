'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // order_item_id:{ // foreign key to OrderItem
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      address_user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_agency:{
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_user:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/
        }
      },
      phone_agengy:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]+$/
        }
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      promotion_id: { // foreign key to Promotion
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.ENUM('cash', 'paypal', 'bank_transfer', 'momo'),
        allowNull: false
      },
      promotion_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
