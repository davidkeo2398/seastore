const express = require('express');
const router = express.Router();

const { agencyRankController } = require('../controllers/index');

router.post('/',agencyRankController.createAgencyrank);
router.get('/', agencyRankController.getAgencyrank);


module.exports = router;