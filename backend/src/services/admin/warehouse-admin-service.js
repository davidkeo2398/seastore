const { Warehouse } = require("../../Model/Index");

module.exports = {
    getWarehouses: async () => {
        try {
            const warehouses = await Warehouse.findAll();
            return warehouses;
            console.log( warehouses)
        } catch (err) {
            throw new Error('Get Warehouses failed: ' + err.message);
        }
    },

    getWarehouseById: async (warehouse_id) => {
        try {
            const warehouse = await Warehouse.findOne({ where: { warehouse_id: warehouse_id } });
            return warehouse;
        } catch (err) {
            throw new Error('Get a Warehouse failed: ' + err.message);
        }
    },

    createWarehouse: async (data) => {
        try {
            const newWarehouse = await Warehouse.create(data);
            return newWarehouse;
        } catch (err) {
            throw new Error('Create Warehouse failed: ' + err.message);
        }
    },

    updateWarehouse: async (warehouse_id, data) => {
        try {
            const [updated] = await Warehouse.update(data, {
                where: { warehouse_id: warehouse_id }
            });
            if (updated) {
                const updatedWarehouse = await Warehouse.findOne({ where: { warehouse_id: warehouse_id } });
                return updatedWarehouse;
            }
            throw new Error('Warehouse not found');
        } catch (err) {
            throw new Error('Update Warehouse failed: ' + err.message);
        }
    },

    deleteWarehouse: async (warehouse_id) => {
        try {
            const deleted = await Warehouse.destroy({
                where: { warehouse_id: warehouse_id }
            });
            if (deleted) {
                return { message: "Warehouse deleted successfully" };
            }
            throw new Error('Warehouse not found');
        } catch (err) {
            throw new Error('Delete Warehouse failed: ' + err.message);
        }
    }
};
