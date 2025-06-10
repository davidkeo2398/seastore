const express = require('express');
const router = express.Router();

const { authController } = require('../controllers/index');
const { authMiddleware } = require('../middleware/index');

router.post('/login', authController.login);
router.post('/register', authController.signup);
router.get('/userInfo', authMiddleware, authController.getUserInfo);

module.exports = router;