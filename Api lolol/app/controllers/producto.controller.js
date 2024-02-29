exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.productoBoard = (req, res) => {
    res.status(200).send("producto Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  //despues de funcionar