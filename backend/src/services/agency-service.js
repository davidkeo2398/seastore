const { Agency } = require("../Model/Index");

module.exports = {
    getAgencies: async () => {
        try {
            const agencies = Agency.findAll();
            return agencies;
        } catch (err) {
            throw new Error('Get Agencies fails: ', err);
        }
    },
    getAgencyById: async (agency_id) => {
        try {
            const agency = Agency.findOne({ where: { agency_id: agency_id } });
            return agency;
        } catch {
            throw new Error('Get a Agency fails: ', err);
        }
    }
}