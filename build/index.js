"use strict";

var _app = _interopRequireDefault(require("./app"));
require("./database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Port = 4000;
_app["default"].listen(Port, function () {
  console.log("On Port : " + Port);
});