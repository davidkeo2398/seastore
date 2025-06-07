const { Categories } = require('../Model/Index');



module.exports = {
    getCategories: async () => {
        try {
            const categories = Categories.findAll();
            return categories;
        }
        catch (err) {
            throw new Error('Get categories failure: ', err)
        }
    }
}