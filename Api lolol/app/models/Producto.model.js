const mongoose = require("mongoose");

const Producto = mongoose.model(
  "Producto",
  new mongoose.Schema({
    nombre: String,
    marca: String,
    cantidad: Number,
    descripcion: String,
    precio: Number,
    url: String,
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

module.exports = Producto;