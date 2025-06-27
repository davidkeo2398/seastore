const express = require('express');
const router = express.Router();

const { warehouseAdminController } = require('../../controllers');

router.get('/', warehouseAdminController.getWarehouses);
router.get('/:warehouse_id', warehouseAdminController.getWarehouseById);
router.post('/', warehouseAdminController.createWarehouse);
router.put('/:warehouse_id', warehouseAdminController.updateWarehouse);
router.delete('/:warehouse_id', warehouseAdminController.deleteWarehouse);

module.exports = router; 