const { SocioverifySignUp } = require("../middlewares");
const controller = require("../controllers/Socioauth.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/socio/signup",
    [
      SocioverifySignUp.checkDuplicateSocionameOrEmail,
      SocioverifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/socio/signin", controller.signin);
   app.put("/api/socio/update/:socioname", [authJwt.verifyToken], controller.update);
  app.delete("/api/socio/delete/:socioname", [authJwt.verifyToken], controller.delete);
};
