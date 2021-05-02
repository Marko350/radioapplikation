const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.allCategories);
router.get("/:id", categoryController.allProgramsInCategories);

module.exports = router;
