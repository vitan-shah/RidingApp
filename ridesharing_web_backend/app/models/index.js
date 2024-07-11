const db = {};

db.Rides = require("./rides.model");
db.User = require("./user.model");
db.OfferRides = require("./offerRides.model");
db.current_status = require("./current_status.model");
db.documents = require("./documents.model");
db.payment_methods = require("./payment_methods.model");
db.roles = require("./roles.model");
module.exports = db;
