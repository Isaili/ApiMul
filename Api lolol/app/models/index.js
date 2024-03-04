const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db= {};

db.mongoose = mongoose;

db.admin =require("./Admin.model");
db.role = require("./Adminrole.model");

db.ROLES = ["admin", "socio", "moderator"];

module.exports = db;