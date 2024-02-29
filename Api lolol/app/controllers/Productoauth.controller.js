const config = require("../config/Producto.auth.config");
const db = require("../models");
const Producto = db.producto;
const Role = db.role;

let jwt =  require("jsonwebtoken");
let bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        marca: req.body.marca,
        cantidad: req.body.cantidad,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        url: req.body.url,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });
    
      producto.save((err, producto) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles }
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              producto.roles = roles.map(role => role._id);
              producto.save(err => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
    
                res.send({ message: "producto was registered successfully!" });
              });
            }
          );
        } else {
          Role.findOne({ name: "producto" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            producto.roles = [role._id];
            producto.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
    
              res.send({ message: "producto was registered successfully!" });
            });
          });
        }
      });
    };
    

    exports.signin = (req, res) => {
        Producto.findOne({
          nombre: req.body.nombre
        })
          .populate("roles", "-__v")
          .exec((err,producto) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
      
            if (!producto) {
              return res.status(404).send({ message: "producto Not found." });
            }
      
            let passwordIsValid = bcrypt.compareSync(
              req.body.password,
              producto.password
            );
      
            if (!passwordIsValid) {
              return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
              });
            }
      
            const token = jwt.sign({ id: producto.id },
                                    config.secret,
                                    {
                                      algorithm: 'HS256',
                                      allowInsecureKeySizes: true,
                                      expiresIn: 86400, // 24 hours
                                    });
      
            let authorities = [];
      
            for (let i = 0; i < producto.roles.length; i++) {
              authorities.push("ROLE_" + producto.roles[i].name.toUpperCase());
            }
            res.status(200).send({
              id: producto._id,
              nombre: producto.nombre,
              marca: producto.marca,
              cantidad: producto.cantidad,
              descripcion: producto.descripcion,
              precio: producto.precio,
              url: producto.url,
              email: producto.email,
              roles: authorities,
              accessToken: token
            });
          });
      };
      


// despues de funcionar