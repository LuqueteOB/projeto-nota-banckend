const ImageModel = require("../models/ImageModel");

class ImageController {
  async listar(request, response) {
    const id = request.body.id;
    const dados = await ImageModel.findAll(id);
    return response.json(dados);
  }

  async consultarPorId(request, response) {
    const id = request.params.id;
    const dados = await ImageModel.findByPk(id);
    return response.json(dados);
  }

  async criar(request, response) {
    const body = request.body;
    console.log(body);

    await ImageModel.create(body);
    return response.status(201).json({
      message: "Imagem cadastrada com sucesso",
    });
  }

  async atualizar(request, response) {
    const id = request.params.id;
    const body = request.body;
    await ImageModel.update(body, {
      where: { id: id },
    });
    return response.json({
      message: "Imagem atualizada com Sucesso",
    });
  }

  async deletar(request, response) {
    const id = request.params.id;
    await ImageModel.destroy({ where: { id } });
    return response.json({
      message: "Imagem deletada com sucesso",
    });
  }
}

module.exports = ImageController;
