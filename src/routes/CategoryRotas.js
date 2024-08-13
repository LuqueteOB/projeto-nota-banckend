const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const CategoryRotas = express.Router();

const categoryController = new CategoryController();

CategoryRotas.get("/categorias", categoryController.listar);
CategoryRotas.get("/categorias/:id", categoryController.consultarPorId);
CategoryRotas.post("/categorias", categoryController.criar);
CategoryRotas.put("/categorias/:id", categoryController.atualizar);
CategoryRotas.delete("/categorias/:id", categoryController.deletar);
CategoryRotas.get("/v1/categorias/search", categoryController.pesquisa);

module.exports = CategoryRotas;
