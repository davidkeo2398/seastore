const express = require('express');
const router = express.Router();

const { promotionController } = require('../controllers/index');

router.get('/', promotionController.getPromotions);

// router.post('/', orderController.createOrder);

module.exports = router;