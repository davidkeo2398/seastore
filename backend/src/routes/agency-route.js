const express = require('express');

const { agencyController } = require('../controllers/index');
const { authController } = require('../controllers/index');

router.post('/',authController, agencyController.createAgency);
router.get('/', authController, agencyController.getAgency);
router.put('/:id', authController, agencyController.updateAgency);



module.exports = router;