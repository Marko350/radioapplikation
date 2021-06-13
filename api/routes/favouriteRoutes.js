const express = require("express");
const router = express.Router();

const favouriteController = require("../controllers/favouriteController");

router.post("/channels", favouriteController.getFavouriteChannels);
router.post("/programs", favouriteController.getFavouritePrograms);
router.post("/newFavChannel", favouriteController.addFavouriteChannel);
router.post("/newFavProgram", favouriteController.addFavouriteProgram);
router.delete(
  "/delete-fav-program",
  favouriteController.deleteFavouriteProgramById
);
router.delete(
  "/delete-fav-channel",
  favouriteController.deleteFavouriteChannelById
);

module.exports = router;
