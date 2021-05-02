// This module allows me to make frontend fetches from my backend.
const fetch = require("node-fetch");
const json = "format=json";
const pagination = "pagination=false";

const getAllChannels = async (req, res) => {
  let allChannels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${pagination}`
  );
  allChannels = await allChannels.json();
  res.json(allChannels.channels);
};

const getFewChannels = async (req, res) => {
  let allChannels = await fetch(`http://api.sr.se/api/v2/channels?${json}`);
  allChannels = await allChannels.json();
  res.json(allChannels.channels);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.id}?${json}`
  );
  channel = await channel.json();
  res.json(channel.channel);
};

module.exports = {
  getAllChannels,
  getChannelById,
  getFewChannels,
};
