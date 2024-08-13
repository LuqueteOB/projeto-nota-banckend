const express = require('express');
const ProdutosController = require('../controllers/ProdutosController');
const ProdutosRotas = express.Router();

const produtosController = new ProdutosController();

ProdutosRotas.get('/produto', produtosController.listar);
ProdutosRotas.get('/produto/:id', produtosController.consultarPorId);
ProdutosRotas.post('/produto', produtosController.criar);
ProdutosRotas.put('/produto/:id', produtosController.atualizar);
ProdutosRotas.delete('/produto/:id', produtosController.deletar);
ProdutosRotas.get('/v1/produto/search', produtosController.pesquisa);


module.exports = ProdutosRotas;