const db = require("../models");

const ROLES = db.ROLES;
const Producto = db.producto;

let checkDuplicatenombreOrEmail = (req, res, next) => {
  // Check if req.body exists
  if (!req.body.nombre) {
    return res.status(400).send({ message: "Bad Request! Request body is missing." });
  }

  // Check for duplicate nombre
  Producto.findOne({
    nombre: req.body.nombre
  }).exec((err, producto) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (producto) {
      res.status(400).send({ message: "Failed! producto name is already in use!" });
      return;
    }

    // Check for duplicate email if it exists in req.body
    if (req.body.email) {
      Producto.findOne({
        email: req.body.email
      }).exec((err, productoByEmail) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (productoByEmail) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }

        next();
      });
    } else {
      // If no email in req.body, move to the next middleware
      next();
    }
  });
};

let checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const ProductoverifySignUp = {
  checkDuplicatenombreOrEmail,
  checkRolesExisted
};

module.exports = ProductoverifySignUp;
