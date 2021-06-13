const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");

router.get("/channel/:channelId", programController.getAllProgramsChannel);
router.get("/:programId", programController.getOneProgram);
router.get("/schedule/:programId", programController.getProgramSchedule);
router.get("/", programController.getAllPrograms);

module.exports = router;
