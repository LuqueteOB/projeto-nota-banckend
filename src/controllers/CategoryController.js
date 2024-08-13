const Category = require("../models/CategoryModel");

class CategoryController {
  async listar(request, response) {
    const id = request.body.id;
    const dados = await Category.findAll(id);
    return response.json(dados);
  }

  async consultarPorId(request, response) {
    const id = request.params.id;
    const dados = await Category.findByPk(id);
    return response.json(dados);
  }

  async criar(request, response) {
    const body = request.body;
    console.log(body);

    await Category.create(body);
    return response.status(201).json({
      message: "Categoria cadastrada com sucesso",
    });
  }

  async atualizar(request, response) {
    const id = request.params.id;
    const body = request.body;
    await Category.update(body, {
      where: { id: id },
    });
    return response.json({
      message: "Categoria atualizada com Sucesso",
    });
  }

  async deletar(request, response) {
    const id = request.params.id;
    await Category.destroy({ where: { id } });
    return response.json({
      message: "Categoria deletada com sucesso",
    });
  }

  async pesquisa(request, response) {
    const { limit = 12, page = 1, fields, use_in_menu } = request.query;

    let whereClause = {};
    if (use_in_menu) {
      whereClause.use_in_menu = use_in_menu === "true";
    }

    const offset = (page - 1) * limit;

    const categories = await Category.findAndCountAll({
      where: whereClause,
      limit: limit === "-1" ? null : parseInt(limit),
      offset: limit === "-1" ? null : offset,
      attributes: fields ? fields.split(",") : undefined,
    });

    return response.json({
      data: categories.rows,
      total: categories.count,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  }
}

module.exports = CategoryController;
