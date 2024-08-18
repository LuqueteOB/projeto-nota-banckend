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
    try {
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
      return response.status(200).json(dados);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro ao listar produtos", error });
    }
  }

  async consultarPorId(request, response) {
    const id = request.params.id;
    try {
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

      if (!dados) {
        return response.status(404).json({ message: "Produto não encontrado" });
      }

      return response.status(200).json(dados);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro ao consultar produto", error });
    }
  }

  async criar(request, response) {
    const { name, slug, price, stock, description, price_with_discount } =
      request.body;

    if (
      !name ||
      !slug ||
      price === undefined ||
      stock === undefined ||
      description === undefined ||
      price_with_discount === undefined
    ) {
      return response.status(400).json({
        message: "Todos os campos são obrigatórios.",
      });
    }

    try {
      const produto = await ProdutosModel.create(request.body);
      return response.status(201).json({
        message: "Produto cadastrado com sucesso",
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro ao cadastrar produto", error });
    }
  }

  async atualizar(request, response) {
    const id = request.params.id;
    const body = request.body;

    try {
      const [updated] = await ProdutosModel.update(body, {
        where: { id: id },
      });

      if (updated) {
        return response.status(200).json({
          message: "Produto atualizado com sucesso",
        });
      }

      return response.status(404).json({ message: "Produto não encontrado" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro ao atualizar produto", error });
    }
  }

  async deletar(request, response) {
    const id = request.params.id;

    try {
      await OptionsProdutos.destroy({ where: { product_id: id } });

      const deleted = await ProdutosModel.destroy({ where: { id } });

      if (deleted) {
        return response.status(200).json({
          message: "Produto deletado com sucesso",
        });
      }

      return response.status(404).json({ message: "Produto não encontrado" });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro ao deletar produto", error });
    }
  }

  async pesquisa(request, response) {
    const { limit = 12, page = 1, fields, use_in_menu } = request.query;
    let whereClause = {};
    if (use_in_menu) {
      whereClause.use_in_menu = use_in_menu === "true";
    }

    const offset = (page - 1) * limit;

    try {
      const produtos = await ProdutosModel.findAndCountAll({
        where: whereClause,
        limit: limit === "-1" ? null : parseInt(limit),
        offset: limit === "-1" ? null : offset,
        attributes: fields
          ? fields.split(",")
          : [
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

      return response.status(200).json({
        data: produtos.rows,
        total: produtos.count,
        limit: parseInt(limit),
        page: parseInt(page),
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro na pesquisa de produtos", error });
    }
  }
}

module.exports = ProdutosController;