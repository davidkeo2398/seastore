const express = require('express');
const router = express.Router();

const { categoriesController } = require('../controllers/index');

router.get('/', categoriesController.getCategories);

module.exports = router;