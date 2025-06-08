const { Product } = require('../Model/Index');



module.exports = {
    getProducts: async () => {
        try {
            const products = Product.findAll();
            return products;
        }
        catch (err) {
            throw new Error('Get products failure: ', err)
        }
    },
    getProductById: async (product_id) => {
        try {
            const product = Product.findOne({ where: { product_id: product_id } });
            return product;
        }
        catch (err) {
            throw new Error('Get a product fail: ', err)
        }
    },
    getProductByCategory: async (category_id) => {
        try {
            const products = Product.findAll({ where: { category_id: category_id } });
            return products;
        } catch (err) {
            throw new Error('Get products by category fail: ', err)

        }
    }
}