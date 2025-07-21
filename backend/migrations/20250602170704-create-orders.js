'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // order_item_id:{ // foreign key to OrderItem
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      address_user: {
        type: Sequelize.STRING,
        allowNull: false
      },
      agency_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_agency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_user: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[0-9]+$/,
            msg: 'Phone number must contain only digits'
          },
          phoneValidation(value) {
            if (value !== null && !/^[0-9]+$/.test(value)) {
              throw new Error('Phone number must contain only digits');
            }
          }
        }
      },
      phone_agency: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: {
            args: /^[0-9]+$/,
            msg: 'Phone number must contain only digits'
          },
          phoneValidation(value) {
            if (value !== null && !/^[0-9]+$/.test(value)) {
              throw new Error('Phone number must contain only digits');
            }
          }
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
        type: Sequelize.ENUM('cash', 'paypal', 'bank_transfer', 'momo', 'vnpay'),
        allowNull: false
      },
      promotion_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('pending','delivering', 'completed', 'cancelled'),
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
