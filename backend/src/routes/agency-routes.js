const express = require('express');
const router = express.Router();

const { agencyController } = require('../controllers/index');
const { authMiddleware } = require('../middleware/index');

router.get('/', agencyController.getAgencies);
router.get('/:agency_id', agencyController.getAgencyById);
module.exports = router;