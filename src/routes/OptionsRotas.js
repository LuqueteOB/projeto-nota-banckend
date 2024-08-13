const express = require('express');
const OptionController = require('../controllers/OptionController');
const OptionsRotas = express.Router();

const optionsController = new OptionController();

OptionsRotas.get('/Produtos', optionsController.listar);
OptionsRotas.get('/Produtos/:id', optionsController.consultarPorId);
OptionsRotas.post('/Produtos', optionsController.criar);
OptionsRotas.put('/Produtos/:id', optionsController.atualizar);
OptionsRotas.delete('/Produtos/:id', optionsController.deletar);
 

module.exports = OptionsRotas;