const express = require("express");
const UserController = require("../controllers/UserController");
const UserRotas = express.Router();

const userController = new UserController();

UserRotas.get("/users", userController.listar);
UserRotas.get("/users/:id", userController.consultarPorId);
UserRotas.post("/users", userController.criar);
UserRotas.put("/users/:id", userController.atualizar);
UserRotas.delete("/users/:id", userController.deletar);
UserRotas.post("/login", (request, response) =>
  userController.login(request, response)
);


module.exports = UserRotas;
