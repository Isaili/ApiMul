const jwt = require("jsonwebtoken");
const config = require("../config/Producto.auth.config.js");
const db = require("../models/index.js");
const Producto = db.Producto;
const Role = db.role;

 let verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.productoId = decoded.id;
              next();
            });
};

let isAdmin = (req, res, next) => {
  Producto.findById(req.productoId).exec((err, producto) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: producto.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

let isModerator = (req, res, next) => {
  Producto.findById(req.productoId).exec((err, producto) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: producto.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const uthJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = uthJwt;

//despues de funcionar
