const express = require("express");
const session = require("express-session");

const port = 3001;

const favouriteRoutes = require("./routes/favouriteRoutes");
const channelRoutes = require("./routes/channelRoutes.js");
const programRoutes = require("./routes/programRoutes.js");
const episodeRoutes = require("./routes/episodeRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "The Phantom Menace",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use("/api/v1/favourites", favouriteRoutes);
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/episodes", episodeRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
