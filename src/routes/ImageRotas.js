const express = require("express");
const ImageController = require("../controllers/ImageController");
const ImageRotas = express.Router();

const imagemController = new ImageController();

ImageRotas.get("/imagem", imagemController.listar);
ImageRotas.get("/imagem/:id", imagemController.consultarPorId);
ImageRotas.post("/imagem", imagemController.criar);
ImageRotas.put("/imagem/:id", imagemController.atualizar);
ImageRotas.delete("/imagem/:id", imagemController.deletar);

module.exports = ImageRotas;
