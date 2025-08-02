const express = require('express');
const { vnpayController } = require('../controllers');
const router = express.Router();



router.post('/create_payment_url', vnpayController.createPayment);
router.get('/vnpay_return', vnpayController.handleVnpayReturn);


module.exports = router;