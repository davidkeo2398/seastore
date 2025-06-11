const { Agency, AgencyRank } = require("../Model/Index");

module.exports = {
  getAgencyrank: async (query = {}) => {
    try {
      const agencyrank = await AgencyRank.findAll();
      return agencyrank;
    } catch (err) {
      throw new Error("Get agencyrank fail", err);
    }
  },
  getAgencyrankById: async (agencyrank_id) => {
    try {
        const agencyrank = await AgencyRank.findOne({where :{agencyrank_id}})
            return agencyrank;
    } catch (err) {
              throw new Error("Get agencyrank by id fail", err);

    }
  }
}
