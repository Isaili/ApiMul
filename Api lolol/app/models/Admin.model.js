const mongoose = require("mongoose");

const Admin = mongoose.model(
  "Admin",
  new mongoose.Schema({
    adminname: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = Admin;
