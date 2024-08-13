const express = require("express");
const jwt = require("jsonwebtoken");
const CategoryRotas = require("../routes/CategoryRotas");
const ProdutosRotas = require("../routes/ProdutosRotas");
const UserRotas = require("../routes/UserRotas");
const ImageRotas = require("../routes/ImageRotas");
const OptionsRotas = require("../routes/OptionsRotas");
require("dotenv").config();

//BARRAR

const RotasPrivadas = express.Router();

RotasPrivadas.use((request, response, next) => {
  let logged = false;

  const auth = request.headers.auth;
  try {
    jwt.verify(auth, process.env.APP_KEY_TOKEN);
    logged = true;
  } catch (JsonWebTokenError) {
    logged = false;
  }

  if (logged === false) {
    return response.status(403).send("Não Autorizado");
  }
  next();
});

//=========================================================

//NAO BARRAR

/*    const RotasPrivadas = express.Router();
    
    RotasPrivadas.use((request, response, next) => {
        const auth = request.headers.auth;
    
        if (!auth) {
            return response.status(401).send("Token não fornecido");
        }
    
        next();
    });  */

RotasPrivadas.use(UserRotas);
RotasPrivadas.use(CategoryRotas);
RotasPrivadas.use(ProdutosRotas);
RotasPrivadas.use(ImageRotas);
RotasPrivadas.use(OptionsRotas);

module.exports = RotasPrivadas;
