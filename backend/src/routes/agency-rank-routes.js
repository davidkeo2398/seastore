const express = require('express');
const router = express.Router();

const { agencyRankController } = require('../controllers/index');
const { authMiddleware } = require('../middleware/index');

router.get('/', agencyRankController.getAgencyRanks);
router.get('/:agency_rank_id', agencyRankController.getAgencyRankById);
module.exports = router;