const config = require("../config/db.config");
const db = require("../models");
const Admin = db.admin;
const Role = db.role;

let jwte = require("jsonwebtoken");
let bcrypte = require("bcryptjs");

exports.signup = (req, res) => {
  const admin = new Admin({
    adminname: req.body.adminname,
    email: req.body.email,
    password: bcrypte.hashSync(req.body.password, 8)
  });

  admin.save((err, admin) => {
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

          admin.roles = roles.map(role => role._id);
          admin.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "admin was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "admin" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        admin.roles = [role._id];
        admin.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "admin  was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  Admin.findOne({
    adminname: req.body.adminname
  })
    .populate("roles", "-__v")
    .exec((err,admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!admin) {
        return res.status(404).send({ message: "admin Not found." });
      }

      let passwordIsValid = bcrypte.compareSync(
        req.body.password,
        admin.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwte.sign({ id: admin.id },
                              config.secret,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });

      let authorities = [];

      for (let i = 0; i < admin.roles.length; i++) {
        authorities.push("ROLE_" + admin.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: admin._id,
        adminname: admin.adminname,
        email: admin.email,
        roles: authorities,
        accessToken: token
      });
    });
};
exports.updateAdmin = (req, res) => {
  Admin.findOneAndUpdate(
    { adminname: req.params.adminname },
    {
      adminname: req.body.adminname,
      email: req.body.email,
    },
    { new: true },
    (err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!admin) {
        return res.status(404).send({ message: "Admin no encontrado." });
      }
      res.send({ message: "Admin actualizado exitosamente." });
    }
  );
};


exports.deleteAdmin = (req, res) => {
  Admin.findOneAndRemove({ adminname: req.params.adminname }, (err, admin) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!admin) {
      return res.status(404).send({ message: "Admin no encontrado." });
    }
    res.send({ message: "Admin eliminado exitosamente." });
  });
};
