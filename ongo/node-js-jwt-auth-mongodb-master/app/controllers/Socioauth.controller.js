const config = require("../config/Socio.auth.config");
const db = require("../models");
const Socio = db.socio;
const Role = db.role;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const socio = new Socio({
    socioname: req.body.socioname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  socio.save((err, socio) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          socio.roles = roles.map(role => role._id);
          socio.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "Socio was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "socio" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        socio.roles = [role._id];
        socio.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "socio was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  Socio.findOne({
    socioname: req.body.socioname
  })
    .populate("roles", "-__v")
    .exec((err,socio) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!socio) {
        return res.status(404).send({ message: "socio Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        socio.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: socio.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      let authorities = [];

      for (let i = 0; i < socio.roles.length; i++) {
        authorities.push("ROLE_" + socio.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: socio._id,
        socioname: socio.socioname,
        email: socio.email,
        roles: authorities,
        accessToken: token
      });
    });
};
