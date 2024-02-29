const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db= {};

db.mongoose = mongoose;

db.user = require("./Producto.model");
db.role = require("./Producto.role.model");

db.ROLES = ["Producto", "admin", "moderator"];

module.exports = db;