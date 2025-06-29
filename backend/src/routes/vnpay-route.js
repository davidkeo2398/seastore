const express = require('express');
const { vnpayController } = require('../controllers');
const router = express.Router();



router.post('/create_payment_url', vnpayController.vnPayCreate);


module.exports = router;