const airlinesService = require("../services/airlinesService");
module.exports.getPagedAirlinesOfUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { pageCount, pageNumber, searchQuery } = req.query;
    if (!userId)
      return res
        .status(400)
        .json({ status: false, msg: "User id is required" });
    if (!pageCount || !pageNumber)
      return res.status(400).json({
        status: false,
        msg: "Page count and page number are required",
      });
    const { pagedAirlines, totalAirlinesCount } =
      await airlinesService.getPagedAirlines(
        userId,
        pageCount,
        pageNumber,
        searchQuery
      );
    let columns = pagedAirlines.length > 0 ? Object.keys(pagedAirlines[0]) : [];

    res.status(200).json({
      status: true,
      data: {
        columns: columns,
        rows: pagedAirlines,
        totalCount: totalAirlinesCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.insertAirlinesRecords = async (req, res, next) => {
  if (!req.parsedXlSheetData) {
    return res.status(400).json({
      status: false,
      msg: "No parsed xl sheet data found",
    });
  }
  try {
    await airlinesService.insertAirlinesRecords(
      req.parsedXlSheetData
    );
    res.status(200).json({
      status: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
