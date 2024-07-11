const userPaths = require("./user.path");
const authPaths = require("./auth.path");

module.exports = {
  ...userPaths,
  ...authPaths,
};
