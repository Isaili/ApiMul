exports.allAccessAdmin = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.Board = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoardAdmin = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
// admin.controller.js
exports.welcome = (req, res) => {
  res.status(200).send("Welcome to the admin API.");
};
