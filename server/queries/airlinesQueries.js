const AirlinesModel = require("../db/models/Airlines");

module.exports = class AirlinesQueries {
  static async getPagedAirlinesCountByUserId(userId, searchQuery) {
    const query = AirlinesModel.query().where("user_id", userId);
    if (searchQuery) {
      query.andWhere((builder) => {
        builder
          .orWhere("airlineName", "like", `%${searchQuery}%`)
          .orWhere("flightNumber", "like", `%${searchQuery}%`)
          .orWhere("departureAirport", "like", `%${searchQuery}%`)
          .orWhere("arrivalAirport", "like", `%${searchQuery}%`)
          .orWhere("departureTime", "like", `%${searchQuery}%`)
          .orWhere("arrivalTime", "like", `%${searchQuery}%`)
          .orWhere("ticketPrice", "like", `%${searchQuery}%`)
          .orWhere("seatNumber", "like", `%${searchQuery}%`);
      });
    }
    return await query.resultSize();
  }
  static async getPagedAirlinesByUserId(
    userId,
    pageCount,
    pageNumber,
    searchQuery
  ) {
    const query = AirlinesModel.query()
      .where("user_id", userId)
      .offset(pageCount * (pageNumber - 1))
      .limit(pageCount);
    if (searchQuery) {
      query.andWhere((builder) => {
        builder
          .orWhere("airlineName", "like", `%${searchQuery}%`)
          .orWhere("flightNumber", "like", `%${searchQuery}%`)
          .orWhere("departureAirport", "like", `%${searchQuery}%`)
          .orWhere("arrivalAirport", "like", `%${searchQuery}%`)
          .orWhere("departureTime", "like", `%${searchQuery}%`)
          .orWhere("arrivalTime", "like", `%${searchQuery}%`)
          .orWhere("ticketPrice", "like", `%${searchQuery}%`)
          .orWhere("seatNumber", "like", `%${searchQuery}%`)
          .orWhere("passengerName", "like", `%${searchQuery}%`)
          .orWhere("passengerEmail", "like", `%${searchQuery}%`)
          .orWhere("passengerPhone", "like", `%${searchQuery}%`);
      });
    }
    return await query;
  }
  static async insertAirlinesData(data) {
    try {
      await AirlinesModel.transaction(async (trx) => {
        for (const element of data) {
          await AirlinesModel.query(trx).insert(element);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};
