const fetch = require("node-fetch");
const json = "format=json";
const pagination = "pagination=false";

const convertToDateObject = require("../core/utilities");

const getAllPrograms = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${pagination}`
  );
  programs = await programs.json();
  res.json(programs.programs);
};

const getOneProgram = async (req, res) => {
  let program = await fetch(
    `http://api.sr.se/api/v2/programs/${req.params.programId}?${json}`
  );
  program = await program.json();
  res.json(program.program);
};

const getProgramSchedule = async (req, res) => {
  let schedule = await fetch(
    `http://api.sr.se/api/v2/broadcasts?programid=${req.params.programId}&${json}&${pagination}`
  );
  schedule = await schedule.json();

  schedule.broadcasts = schedule.broadcasts.map((broadcast) => {
    return {
      ...broadcast,
      broadcastdateutc: convertToDateObject(broadcast.broadcastdateutc),
    };
  });
  res.json(schedule);
};

module.exports = {
  getAllPrograms,
  getOneProgram,
  getProgramSchedule,
};
