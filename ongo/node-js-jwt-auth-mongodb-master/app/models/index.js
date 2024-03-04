const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.socio = require("./user.model");
db.role = require("./Sociorole.model");
db.admin =require("./Admin.model");
db.role = require("./Adminrole.model");

db.ROLES = ["socio", "admin", "moderator"];
db.ROLES = ["admin" ,"admin", "moderator"];


module.exports = db;