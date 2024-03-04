const { authJwte } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get("/api/test/all", controller.welcome);
  
    app.get("/api/test/admin", [authJwte.verifyToken], controller.adminBoard); // Corregido aquí
  
    app.get(
      "/api/test/mod",
      [authJwte.verifyToken, authJwte.isModerator],
      controller.moderatorBoard
    );
  
    app.get(
      "/api/test/adminBoard",
      [authJwte.verifyToken, authJwte.isAdmin],
      controller.adminBoard
    );
};
