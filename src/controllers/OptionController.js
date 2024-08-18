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
    const { category_ids, ...body } = request.body;

    try {
      
      const produto = await OptionsProdutos.create(body, {
        include: [
          {
            model: Category,
            as: "Category_ids",
            through: {
              attributes: [], 
            },
          },
        ],
      });

      if (category_ids && category_ids.length > 0) {
        await produto.setCategory_ids(category_ids);
      }

      return response.status(201).json({
        message: "Produto cadastrado com sucesso",
      });
    } catch (error) {
      return response.status(400).json({
        message: "Erro ao cadastrar produto",
        error: error.message,
      });
    }
  }

  async listar(request, response) {
    try {
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
      return response.status(200).json(dados);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao listar produtos",
        error: error.message,
      });
    }
  }

  async consultarPorId(request, response) {
    try {
      const id = request.params.id;
      const dados = await OptionsProdutos.findByPk(id, {
        attributes: ["title", "shape", "radius", "stock", "type", "values"],
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

      if (!dados) {
        return response.status(404).json({
          message: "Produto não encontrado",
        });
      }

      return response.status(200).json(dados);
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao consultar produto",
        error: error.message,
      });
    }
  }

  async atualizar(request, response) {
    try {
      const id = request.params.id;
      const body = request.body;

      if (Array.isArray(body.values)) {
        body.values = JSON.stringify(body.values);
      }

      const [updated] = await OptionsProdutos.update(body, {
        where: { id: id },
      });

      if (updated) {
        return response.status(200).json({
          message: "Produto atualizado com sucesso",
        });
      }

      return response.status(404).json({
        message: "Produto não encontrado",
      });
    } catch (error) {
      return response.status(400).json({
        message: "Erro ao atualizar produto",
        error: error.message,
      });
    }
  }

  async deletar(request, response) {
    try {
      const id = request.params.id;
      const optionsCount = await OptionsProdutos.count({
        where: { product_id: id },
      });

      await OptionsProdutos.destroy({ where: { id } });
      return response.status(200).json({
        message: "Produto deletado com sucesso",
      });
    } catch (error) {
      return response.status(500).json({
        message: "Erro ao deletar produto",
        error: error.message,
      });
    }
  }
}

module.exports = OptionController;
