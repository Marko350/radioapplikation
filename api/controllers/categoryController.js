const fetch = require("node-fetch");

const json = "format=json";
const pagination = "pagination=false";

const allCategories = async (req, res) => {
  let categories = await fetch(
    `http://api.sr.se/api/v2/programcategories/?${json}&${pagination}`
  );
  categories = await categories.json();
  res.json(categories.programcategories);
};

const allProgramsInCategories = async (req, res) => {
  let programList = await fetch(
    `http://api.sr.se/api/v2/programs/index?${json}&${pagination}&programcategoryid=${req.params.id}`
  );
  programList = await programList.json();
  res.json(programList.programs);
};

module.exports = {
  allCategories,
  allProgramsInCategories,
};
