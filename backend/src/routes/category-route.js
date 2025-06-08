const express = require('express');
const router = express.Router();

const { categoriesController } = require('../controllers/index');

router.get('/', categoriesController.getCategories);
// router.post('/', orderController.createOrder);

module.exports = router;