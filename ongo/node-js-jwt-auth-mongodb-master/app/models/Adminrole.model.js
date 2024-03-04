const mongoose = require("mongoose");

const Caso = mongoose.model(
  "Caso",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Caso;