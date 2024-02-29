const { uthJwt } = require("../middlewares");
const controller = require("../controllers/producto.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/producto", [uthJwt.verifyToken], controller.productoBoard );

  app.get(
    "/api/test/mod",
    [uthJwt.verifyToken, uthJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [uthJwt.verifyToken, uthJwt.isAdmin],
    controller.adminBoard
  );
};
