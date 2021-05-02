const express = require("express");
const router = express.Router();

const episodeController = require("../controllers/episodeController");

router.get("/:programId", episodeController.getAllEpisodes);

module.exports = router;
