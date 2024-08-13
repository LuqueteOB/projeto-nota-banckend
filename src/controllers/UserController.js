const UserModel = require("../models/UserModel");
const MD5 = require("crypto-js/md5");

class UserController {
  async listar(request, response) {
    const id = request.body.id;
    const dados = await UserModel.findAll(id);
    return response.json(dados);
  }

  async consultarPorId(request, response) {
    const id = request.params.id;
    const dados = await UserModel.findByPk(id);
    return response.json(dados);
  }

  criar(request, response) {
    const body = request.body;
    const password = MD5(body.password).toString();
    body.password = password;
    const confirmPassword = MD5(body.confirmPassword).toString();
    body.confirmPassword = confirmPassword;
    UserModel.create(body);
    return response.status(201).json({
      message: "Usuário cadastrado com sucesso",
    });
  }

  async atualizar(request, response) {
    const id = request.params.id;
    const body = request.body;
    const password = MD5(body.password).toString();
    body.password = password;
    const confirmPassword = MD5(body.confirmPassword).toString();
    body.confirmPassword = confirmPassword;
    await UserModel.update(body, {
      where: { id: id },
    });
    return response.json({
      message: "Usuario atualizado com Sucesso",
    });
  }

  async deletar(request, response) {
    const id = request.params.id;
    await UserModel.destroy({ where: { id } });
    return response.json({
      message: "Usuario deletado com sucesso",
    });
  }
}

module.exports = UserController;
