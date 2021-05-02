const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");

router.get("/channel/:channelId", programController.getAllPrograms);
router.get("/:programId", programController.getOneProgram);
router.get("/schedule/:programId", programController.getProgramSchedule);

module.exports = router;
