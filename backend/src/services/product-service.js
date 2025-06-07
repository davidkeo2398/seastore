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
    }
}