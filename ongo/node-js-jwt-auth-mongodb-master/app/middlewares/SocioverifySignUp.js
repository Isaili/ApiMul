const db = require("../models");
const ROLES = db.ROLES;
const Socio = db.socio;

let checkDuplicateSocionameOrEmail = (req, res, next) => {
  // Username
  Socio.findOne({
    socioname: req.body.socioname
  }).exec((err, socio) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (socio) {
      res.status(400).send({ message: "Failed! Socioname is already in use!" });
      return;
    }

    // Email
    Socio.findOne({
      email: req.body.email
    }).exec((err, socio) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (socio) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
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

const SocioverifySignUp = {
  checkDuplicateSocionameOrEmail,
  checkRolesExisted
};

module.exports = SocioverifySignUp;
