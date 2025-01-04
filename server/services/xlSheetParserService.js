const xlsxParser = require("xlsx");
const { returnTimeStamp } = require("../utils/generateRandomAirlinesData");
module.exports = class XlSheetParserService {
  static parseXlSheet(file) {
    try {
      const parsedXlSheetFile = xlsxParser.readFile(file.path);
      const parsedData = parsedXlSheetFile.SheetNames.map((sheetName) => {
        return xlsxParser.utils.sheet_to_json(
          parsedXlSheetFile.Sheets[sheetName]
        );
      });
      return parsedData[0];
    } catch (error) {
      throw error;
    }
  }
  static addFields(data, userId) {
    try {
      const dataWithFields = data.map((record) => {
        return {
          ...record,
          userId: parseInt(userId),
          createdAt: returnTimeStamp(),
          updatedAt: returnTimeStamp(),
        };
      });
      return dataWithFields;
    } catch (error) {
      throw error;
    }
  }
};
