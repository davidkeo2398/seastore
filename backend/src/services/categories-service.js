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
    },
    // test
    getCategoryById: async (id) => {
        try{
            const category = await Categories.findOne({
                where: { category_id: id }
            });
            return category;

        } catch (err) {
            throw new Error('Get category by ID fail: ', err)
        }
    },
}