const {AdminverifySignUp} = require("../middlewares");
const AdminController = require("../controllers/Adminauth.controller")
const { authJwte } = require("../middlewares");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post(
        "/api/admin/signup",
        [
          AdminverifySignUp.checkDuplicateAdminnameOrEmail,
          AdminverifySignUp.checkRolesExisted
        ],
        AdminController.signup
      );
      app.post("/api/admin/signin", AdminController.signin);
      app.put("/api/admin/updateAdmin/:adminname", [authJwte.verifyToken], AdminController.updateAdmin);
      app.delete("/api/admin/deleteAdmin/:adminname", [authJwte.verifyToken],AdminController.deleteAdmin);
    };
    