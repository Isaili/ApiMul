const authJwt = require("./Socio.authJwt");
const authJwte = require("./Admin.authJwt")
const SocioverifySignUp = require("./SocioverifySignUp");
const AdminverifySignUp = require("./AdminverifySignUp")


module.exports = {
  authJwt,
  authJwte,
  SocioverifySignUp,
  AdminverifySignUp
  
};
