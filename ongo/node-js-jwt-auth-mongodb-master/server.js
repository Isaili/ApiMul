// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");  // Asegúrate de importar mongoose
// const dbConfig = require("./app/config/db.config");

// mongoose.set('strictQuery', false);  // Agregar esta línea

// const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
// const Role = db.role;

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial(); // Initialize roles for socio
//     init(); // Initialize roles for admin
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome to bezkoder application." });
// });

// // Socio routes
// require("./app/routes/auth.routes")(app);
// require("./app/routes/Socio.routes")(app);

// // Admin routes
//  require("./app/routes/auth.Admin.routes")(app);
//  require("./app/routes/Admin.routes")(app);

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// function initial() {
//   initializeRoles(["socio", "moderator", "admin"]);
// }

// function init() {
//   initializeRoles(["admin", "moderator", "admin"]);
// }

// function initializeRoles(roleNames) {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       roleNames.forEach(name => {
//         new Role({ name }).save(err => {
//           if (err) {
//             console.log(`Error adding '${name}' to roles collection:`, err);
//           } else {
//             console.log(`Added '${name}' to roles collection`);
//           }
//         });
//       });
//     }
//   });
// }
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");

mongoose.set('strictQuery', false);

const app = express();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initializeRoles(["socio", "moderator", "admin"]);
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send({ message: "Welcome to your application." });
});

// Socio routes
require("./app/routes/auth.routes")(app);
require("./app/routes/Socio.routes")(app);

// Admin routes
// require("./app/routes/auth.Admin.routes")(app);
// require("./app/routes/Admin.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initializeRoles(roleNames) {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      roleNames.forEach(name => {
        new Role({ name }).save(err => {
          if (err) {
            console.log(`Error adding '${name}' to roles collection:`, err);
          } else {
            console.log(`Added '${name}' to roles collection`);
          }
        });
      });
    }
  });
}
