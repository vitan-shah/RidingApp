const responseSchema = require("./response.schema");
const authSchema = require("./auth.schema");

module.exports = {
  ...responseSchema,
  ...authSchema,
};
