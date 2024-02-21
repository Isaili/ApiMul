const mongoose = require("mongoose");

const Socio = mongoose.model(
  "Socio",
  new mongoose.Schema({
    socioname: String,
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

module.exports = Socio;

