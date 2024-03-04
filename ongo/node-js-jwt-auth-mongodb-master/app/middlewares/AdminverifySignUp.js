const db = require("../models");
const ROLES = db.ROLES;
const Admin = db.admin;

let checkDuplicateAdminnameOrEmail = (req, res, next) => {
    // Username
    Admin.findOne({
      adminname: req.body.adminname
    }).exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (admin) {
        res.status(400).send({ message: "Failed! adminname is already in use!" });
        return;
      }
  
      Admin.findOne({
        email: req.body.email
      }).exec((err, socio) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (admin) {
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
  
  const AdminverifySignUp = {
    checkDuplicateAdminnameOrEmail,
    checkRolesExisted
  };
  
  module.exports = AdminverifySignUp;
  