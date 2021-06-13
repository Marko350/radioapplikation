const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channelController");

router.get("/allChannels", channelController.getAllChannels);
router.get("/", channelController.getFewChannels);
router.get("/:id", channelController.getChannelById);

module.exports = router;
