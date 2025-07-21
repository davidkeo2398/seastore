const { Promotion } = require('../Model/Index');

// Lấy danh sách khuyến mãi
module.exports = {
    getPromotions: async () => {
        try {
            const promotions = Promotion.findAll();
            return promotions;
        }
        catch (err) {
            throw new Error('Get promotions fails: ', err);
        }
    }
}