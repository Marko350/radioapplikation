const sqlite3 = require("sqlite3");
const path = require("path");
const encrypt = require("../core/encrypt");

const db = new sqlite3.Database(path.join(__dirname, "../../SQL/radioDB.db"));

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

const login = (req, res) => {
  // console.log("This is req: ", req);

  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };

  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }

    req.body.password = encrypt(req.body.password);
    if (userInDB.password === req.body.password) {
      delete userInDB.password;
      req.session.user = userInDB;
      res.json({ success: "Login successfull", loggedInUser: userInDB });
      return;
    } else {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }
  });
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: "Logout Successfully" });
};

const register = (req, res) => {
  let userToRegister = req.body;
  // console.log(userToRegister);
  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToRegister.email };
  db.get(query, params, (err, result) => {
    if (result) {
      res.json({ error: "User with that email already exists" });
    } else {
      userToRegister.password = encrypt(userToRegister.password);
      let query = `INSERT INTO users (userName, email, password) VALUES ($userName, $email, $password)`;
      let params = {
        $userName: userToRegister.userName,
        $email: userToRegister.email,
        $password: userToRegister.password,
      };
      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        }

        res.json({ success: "User register successfull", lastID: this.lastID });
      });
    }
  });
};

module.exports = {
  whoami,
  login,
  logout,
  register,
};
