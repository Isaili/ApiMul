const { ProductoverifySignUp } = require("../middlewares");
const controller = require("../controllers/Productoauth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/Producto/signup",
    [
      ProductoverifySignUp.checkDuplicatenombreOrEmail,
      ProductoverifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/Producto/signin", controller.signin);
};
