const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.socio = require("./user.model");
db.role = require("./Sociorole.model");

db.ROLES = ["socio", "admin", "moderator"];

module.exports = db;