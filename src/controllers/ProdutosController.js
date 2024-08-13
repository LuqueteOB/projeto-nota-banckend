const ProdutosModel = require("../models/ProdutosModel");
const ImageModel = require("../models/ImageModel");
const ProdutosCategory = require("../models/ProdutosCategory");
const Category = require("../models/CategoryModel");
const OptionsProdutos = require("../models/OptionsProdutos");

ProdutosModel.belongsTo(ImageModel, {
  foreignKey: "id",
  as: "image",
});

ProdutosModel.belongsToMany(Category, {
  through: ProdutosCategory,
  foreignKey: "product_id",
  otherKey: "category_id",
  as: "category_ids",
});

ProdutosModel.belongsTo(OptionsProdutos, {
  foreignKey: "id",
  as: "options",
});

class ProdutosController {
  async listar(request, response) {
    const id = request.body.id;
    const dados = await ProdutosModel.findAll({
      attributes: [
        "id",
        "enabled",
        "name",
        "slug",
        "stock",
        "description",
        "price",
        "price_with_discount",
      ],
      include: [
        {
          model: Category,
          as: "category_ids",
          attributes: ["id", "name"],
        },
        {
          model: ImageModel,
          as: "image",
          attributes: ["id", "content"],
        },
        {
          model: OptionsProdutos,
          as: "options",
          attributes: ["title", "shape", "radius", "stock", "type", "values"],
        },
      ],
    });

    return response.json(dados);
  }

  async consultarPorId(request, response) {
    const id = request.params.id;
    const dados = await ProdutosModel.findByPk(id, {
      attributes: [
        "id",
        "enabled",
        "name",
        "slug",
        "stock",
        "description",
        "price",
        "price_with_discount",
      ],
      include: [
        {
          model: Category,
          as: "category_ids",
          attributes: ["id", "name"],
        },
        {
          model: ImageModel,
          as: "image",
          attributes: ["id", "content"],
        },
        {
          model: OptionsProdutos,
          as: "options",
          attributes: ["title", "shape", "radius", "stock", "type", "values"],
        },
      ],
    });
    return response.json(dados);
  }

  async criar(request, response) {
    const body = request.body;
    await ProdutosModel.create(body);
    return response.status(201).json({
      message: "Produto cadastrado com sucesso",
    });
  }

  async atualizar(request, response) {
    const id = request.params.id;
    const body = request.body;
    await ProdutosModel.update(body, {
      attributes: [
        "id",
        "enabled",
        "name",
        "slug",
        "stock",
        "description",
        "price",
        "price_with_discount",
      ],
      where: { id: id },
      include: [
        {
          model: Category,
          as: "category_ids",
          attributes: ["id", "name"],
        },
        {
          model: ImageModel,
          as: "image",
          attributes: ["id", "content"],
        },
        {
          model: OptionsProdutos,
          as: "options",
          attributes: ["title", "shape", "radius", "stock", "type", "values"],
        },
      ],
    });
    return response.json({
      message: "Produto atualizado com Sucesso",
    });
  }

  async deletar(request, response) {
    const id = request.params.id;

    await OptionsProdutos.destroy({ where: { product_id: id } });

    await ProdutosModel.destroy({ where: { id } });

    return response.json({
      message: "Produto e opções deletados com sucesso",
    });
  }

  async pesquisa(request, response) {
    const { limit = 12, page = 1, fields, use_in_menu } = request.query;
    let whereClause = {};
    if (use_in_menu) {
      whereClause.use_in_menu = use_in_menu === "true";
    }

    const offset = (page - 1) * limit;

    const produtos = await ProdutosModel.findAndCountAll({
      where: whereClause,
      limit: limit === "-1" ? null : parseInt(limit),
      offset: limit === "-1" ? null : offset,
      attributes: fields ? fields.split(",") : undefined,
      attributes: [
        "id",
        "enabled",
        "name",
        "slug",
        "stock",
        "description",
        "price",
        "price_with_discount",
      ],
      include: [
        {
          model: Category,
          as: "category_ids",
          attributes: ["id", "name"],
        },
        {
          model: ImageModel,
          as: "image",
          attributes: ["id", "content"],
        },
        {
          model: OptionsProdutos,
          as: "options",
          attributes: ["title", "shape", "radius", "stock", "type", "values"],
        },
      ],
    });

    return response.json({
      data: produtos.rows,
      total: produtos.count,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  }
}

module.exports = ProdutosController;
