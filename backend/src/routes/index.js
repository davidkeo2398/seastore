const express = require('express');
const router = express.Router();

const authRoutes = require('./auth-route');


//Authentication group api routes
router.use('/auth', authRoutes);

module.exports = router;