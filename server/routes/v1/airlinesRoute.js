const express = require("express");
const router = express.Router();
const airlinesController = require("../../controllers/airlinesController");
const upload = require("../../middleware/multer");
const {xlSheetParser} = require('../../middleware/xlSheetParser')
const { verifyTokenMiddleware } = require("../../middleware/verifyToken");
router.get(
  "/getAirlinesByUserId/:userId",
  verifyTokenMiddleware,
  airlinesController.getPagedAirlinesOfUser
);
router.post(
  "/insertAirlinesRecords/:userId",
  verifyTokenMiddleware,
  upload.single("xlSheet"),
  xlSheetParser,
  airlinesController.insertAirlinesRecords
);
module.exports = router;
