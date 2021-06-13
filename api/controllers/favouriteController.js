const sqlite3 = require("sqlite3");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../SQL/radioDB.db"));

const addFavouriteChannel = (req, res) => {
  let query = `INSERT INTO channels (userId, channelId) VALUES ($userId, $channelId)`;
  let params = {
    $userId: req.body.userId,
    $channelId: req.body.channelId,
  };

  db.run(query, params, (err, success) => {
    if (err) {
      res.json({ error: "Error", err });
      return;
    } else {
      query = `SELECT * FROM channels WHERE userId = $userId`;
      params = {
        $userId: req.body.userId,
      };

      db.all(query, params, (err, favourite) => {
        res.json({ success: "Success", favourite });
      });
    }
  });
};

const addFavouriteProgram = (req, res) => {
  query = `INSERT INTO programs (userId, programId) VALUES ($userId, $programId)`;
  params = {
    $userId: req.body.userId,
    $programId: req.body.programId,
  };
  db.run(query, params);
  query = `SELECT * FROM programs WHERE userId = $userId`;
  params = {
    $userId: req.body.userId,
  };

  db.all(query, params, (err, favourites) => {
    if (favourites) {
      res.json({ success: "Successfully added to db", favourites });
    } else {
      res.json({ error: "Could not get all favourites" });
    }
  });
};

const deleteFavouriteChannelById = (req, res) => {
  let query = `DELETE FROM channels WHERE userId = $userId AND channelId = $channelId `;
  let params = {
    $userId: req.body.userId,
    $channelId: req.body.channelId,
  };

  db.run(query, params);

  query = `SELECT * FROM channels WHERE userId = $userId`;
  params = {
    $userId: req.body.userId,
  };
  db.all(query, params, (err, favourites) => {
    if (err) {
      res.json({ error: "Could not get all channels", err });
      return;
    } else {
      res.json({ success: "Favourite is deleted", favourites });
    }
  });
};

const deleteFavouriteProgramById = (req, res) => {
  let query = `DELETE FROM programs WHERE userId = $userId AND programId = $programId `;
  let params = {
    $userId: req.body.userId,
    $programId: req.body.programId,
  };

  db.run(query, params);

  query = `SELECT * FROM programs WHERE userId = $userId`;
  params = {
    $userId: req.body.userId,
  };

  db.all(query, params, (err, favourites) => {
    if (favourites) {
      res.json({ success: "Got list of favourite programs", favourites });
    } else if (err) {
      res.json({ error: "Could not get list ", err });
    }
  });
};

const getFavouriteChannels = (req, res) => {
  let query = `SELECT * FROM channels WHERE userId = $userId`;
  let params = {
    $userId: req.body.userId,
  };
  db.all(query, params, (err, favourites) => {
    if (favourites) {
      res.json({ success: "Got the channels", favourites });
    } else if (err) {
      res.json({ error: err });
    }
  });
};

const getFavouritePrograms = (req, res) => {
  let query = `SELECT * FROM programs WHERE userId = $userId`;
  let params = {
    $userId: req.body.userId,
  };
  db.all(query, params, (err, favourites) => {
    if (favourites) {
      res.json({ success: "Got the programs", favourites });
    } else if (err) {
      res.json({ error: err });
    }
  });
};

module.exports = {
  addFavouriteChannel,
  addFavouriteProgram,
  deleteFavouriteChannelById,
  deleteFavouriteProgramById,
  getFavouriteChannels,
  getFavouritePrograms,
};
