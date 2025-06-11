const express = require('express');
const router = express.Router();

const { agencyController } = require('../controllers/index');

router.post('/', agencyController.createAgency);
router.get('/', agencyController.getAgency);
router.put('/:id', agencyController.updateAgency);



module.exports = router;