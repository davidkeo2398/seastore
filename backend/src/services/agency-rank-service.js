const { AgencyRank } = require("../Model/Index");

module.exports = {
    getAgencyRanks: async () => {
        try {
            const agency_ranks = AgencyRank.findAll();
            return agency_ranks;
        } catch (err) {
            throw new Error('Get Agency Ranks fails: ', err);
        }
    },
    getAgencyRankById: async (agency_rank_id) => {
        try {
            const agency_ranks = AgencyRank.findOne({ where: { agency_rank_id: agency_rank_id } });
            return agency_ranks;
        } catch (err) {
            throw new Error('Get Agency Ranks fails: ', err);
        }
    }
}