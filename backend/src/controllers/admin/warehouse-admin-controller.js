const { warehouseAdminService } = require('../../services');

module.exports = {
    getWarehouses: async (req, res) => {
        try {
            const result = await warehouseAdminService.getWarehouses();
            return res.status(200).json({
                message: "Get warehouses success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Get warehouses fail",
                error: err.message
            });
        }
    },
    getWarehouseById: async (req, res) => {
        try {
            const result = await warehouseAdminService.getWarehouseById(req.params.warehouse_id);
            return res.status(200).json({
                message: "Get warehouse by id success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Get warehouse by id fail",
                error: err.message
            });
        }
    },
    createWarehouse: async (req, res) => {
        try {
            const result = await warehouseAdminService.createWarehouse(req.body);
            return res.status(201).json({
                message: "Create warehouse success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Create warehouse fail",
                error: err.message
            });
        }
    },
    updateWarehouse: async (req, res) => {
        try {
            const result = await warehouseAdminService.updateWarehouse(req.params.warehouse_id, req.body);
            return res.status(200).json({
                message: "Update warehouse success",
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Update warehouse fail",
                error: err.message
            });
        }
    },
    deleteWarehouse: async (req, res) => {
        try {
            await warehouseAdminService.deleteWarehouse(req.params.warehouse_id);
            return res.status(200).json({
                message: "Delete warehouse success",
            });
        } catch (err) {
            return res.status(400).json({
                message: "Delete warehouse fail",
                error: err.message
            });
        }
    }
};
