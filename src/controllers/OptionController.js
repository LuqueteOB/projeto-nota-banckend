const Category = require("../models/CategoryModel");
const ImagemModel = require("../models/ImageModel");
const OptionsProdutos = require("../models/OptionsProdutos");
const ProdutosCategory = require("../models/ProdutosCategory");

OptionsProdutos.belongsTo(ImagemModel, {
  foreignKey: "id",
  as: "image",
});

OptionsProdutos.belongsToMany(Category, {
  through: ProdutosCategory,
  foreignKey: "product_id",
  as: "Category_ids",
  otherKey: "category_id",
});

class OptionController {
  async criar(request, response) {
    const { tags, ...body } = request.body;
    let posts = await OptionsProdutos.create(body, {
      include: {
        through: ProdutosCategory,
        model: Category,
        as: "Category_ids",
      },
    });

    posts.setCategory_ids(tags);

    return response.status(201).json({
      message: "Produto cadastrado com Sucesso",
    });
  }

  async listar(request, response) {
    const dados = await OptionsProdutos.findAll({
      attributes: [
        "product_id",
        "title",
        "shape",
        "radius",
        "stock",
        "type",
        "values",
      ],
      include: [
        {
          model: Category,
          as: "Category_ids",
          attributes: ["id", "name"],
        },
        {
          model: ImagemModel,
          as: "image",
          attributes: ["id", "content"],
        },
      ],
    });
    return response.json(dados);
  }

  async consultarPorId(request, response) {
    const id = request.params.id;
    const dados = await OptionsProdutos.findByPk(id, {
      attributes: ["", "title", "shape", "radius", "stock", "type", "values"],
      include: [
        {
          model: Category,
          as: "category_ids",
          attributes: ["id", "name"],
        },
        {
          model: ImagemModel,
          as: "image",
          attributes: ["id", "content"],
        },
      ],
    });
    return response.json(dados);
  }

  async atualizar(request, response) {
    const id = request.params.id;
    const body = request.body;

    if (Array.isArray(body.values)) {
      body.values = JSON.stringify(body.values);
    }

    await OptionsProdutos.update(body, {
      where: { id: id },
    });

    return response.json({
      message: "Produto atualizado com Sucesso",
    });
  }

  async deletar(request, response) {
    const id = request.params.id;
    const optionsCount = await OptionsProdutos.count({
      where: { product_id: id },
    });

    if (optionsCount > 0) {
      return response
        .status(400)
        .json({
          message: "Não é possível deletar o produto com opções associadas.",
        });
    }

    await Produtos.destroy({ where: { id } });
    return response.json({
      message: "Produto deletado com sucesso",
    });
  }
}

module.exports = OptionController;
