const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/dbcontext');

module.exports = (sequelize) => {
    class Product extends Model {
        otherPublicField;
    }

    Product.init(
        {
            product_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [1, 255] // Ensure the category name is not empty and has a reasonable length
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    len: [0, 500] // Optional description with a maximum length
                }
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Categories', // Assuming you have a Categories model
                    key: 'category_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL' // Set to NULL if the category is deleted
            },
            agency_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Agency', // Assuming you have an Agency model
                    key: 'agency_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL' // Set to NULL if the agency is deleted
            },
            price: {
                type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
                allowNull: false,
                validate: {
                    isDecimal: true, // Ensure it's a valid decimal number
                    min: 0 // Price must be non-negative
                }
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: ['kg', 'g', 'litre', 'piece'] // Example units, adjust as needed
                }
            },
            old_price: {
                type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
                allowNull: true,
                validate: {
                    isDecimal: true, // Ensure it's a valid decimal number
                    min: 0 // Old price must be non-negative
                }
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true // Ensure it's a valid URL if you store image URLs
                }
            },
            warehouse_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Warehouse', // Assuming you have a Warehouse model
                    key: 'warehouse_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL' // Set to NULL if the warehouse is deleted
            },
            number_of_inventory: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true, // Ensure it's an integer
                    min: 0 // Inventory count must be non-negative
                }
            }
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps: true
        }
    );
    return Product;
}