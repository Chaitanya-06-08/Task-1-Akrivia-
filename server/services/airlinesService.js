const AirlinesQueries = require("../queries/airlinesQueries");
module.exports = class Airlines {
  static async getPagedAirlines(userId, pageCount, pageNumber,searchQuery) {
    const pagedAirlines = await AirlinesQueries.getPagedAirlinesByUserId(userId,pageCount,pageNumber,searchQuery);
    const totalAirlinesCount = await AirlinesQueries.getPagedAirlinesCountByUserId(userId,searchQuery);
    return { pagedAirlines, totalAirlinesCount };
  }
  static async insertAirlinesRecords(data){
    await AirlinesQueries.insertAirlinesData(data)
  }
};
