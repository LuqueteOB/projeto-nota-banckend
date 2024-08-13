const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AuthController = require("../controllers/AuthController");
const MD5 = require("crypto-js/md5");
const UserModel = require("../models/UserModel");

const RotasPublicas = express.Router();

RotasPublicas.post("/login", async (request, response) => {
  const body = request.body;
  const auth = new AuthController();
  const dados = await auth.login(body.email, body.password);

  if (dados) {
    const dataToken = {
      id: dados.id,
      email: dados.email,
      password: dados.password,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const token = jwt.sign(dataToken, process.env.APP_KEY_TOKEN);
    return response.json({
      data: dados,
      token: token,
    });
  }
  console.log(dados);

  return response.json({
    message: "Login ou senha incorreta",
  });
});

RotasPublicas.post("/signup", async (request, response) => {
  const body = request.body;
  const password = MD5(body.password).toString();
  body.password = password;
  const confirmPassword = MD5(body.confirmPassword).toString();
  body.confirmPassword = confirmPassword;
  UserModel.create(body);
  return response.status(201).json({
    message: "Usuário cadastrado com sucesso",
  });
});

module.exports = RotasPublicas;
