const express = require('express');
const router = express.Router();

const { agencyrankController } = require('../controllers/index');

router.post('/',agencyrankController.createAgencyrank);
router.get('/', agencyrankController.getAgencyrank);


module.exports = router;