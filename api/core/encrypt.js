const crypto = require("crypto");

const encrypt = (password) => {
  return crypto
    .createHmac("sha256", "Attack of the Clones")
    .update(password)
    .digest("hex");
};

module.exports = encrypt;
