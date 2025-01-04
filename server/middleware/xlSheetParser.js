const xlsxParser = require("xlsx");
const { returnTimeStamp } = require("../utils/generateRandomAirlinesData");
module.exports.xlSheetParser = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file received" });
  }
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  }
  try {
    const parsedXlSheetFile = xlsxParser.readFile(req.file.path);
    const parsedData = parsedXlSheetFile.SheetNames.map((sheetName) => {
      return xlsxParser.utils.sheet_to_json(
        parsedXlSheetFile.Sheets[sheetName]
      );
    });

    const dataWithFields = [];
    parsedData.forEach((sheetData) => {
      sheetData.forEach((record) => {
        dataWithFields.push({
          ...record,
          userId: parseInt(userId),
          createdAt: returnTimeStamp(),
          updatedAt: returnTimeStamp(),
        });
      });
    });
    req.parsedXlSheetData = dataWithFields;
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error In parsing xl sheet",
    });
  }
};
