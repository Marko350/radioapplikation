const fetch = require("node-fetch");
const convertToDateObject = require("../core/utilities");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllEpisodes = async (req, res) => {
  let episodeList = await fetch(
    `http://api.sr.se/api/v2/episodes/index?${json}&${paginationFalse}&programid=${req.params.programId}&fromdate=2021-01-01`
  );
  episodeList = await episodeList.json();

  episodeList.episodes = episodeList.episodes.map((episode) => {
    return {
      ...episode,
      publishdateutc: convertToDateObject(episode.publishdateutc),
      broadcasttime: {
        starttimeutc: convertToDateObject(episode.broadcasttime.starttimeutc),
        endtimeutc: convertToDateObject(episode.broadcasttime.endtimeutc),
      },
    };
  });

  res.json(episodeList.episodes);
};

module.exports = {
  getAllEpisodes,
};
