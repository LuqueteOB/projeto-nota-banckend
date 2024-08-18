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

  async criar(request, response) {
    try {
      const body = request.body;
      const password = MD5(body.password).toString();
      const confirmPassword = MD5(body.confirmPassword).toString();

      if (password !== confirmPassword) {
        return response.status(400).json({
          message: "As senhas não coincidem.",
        });
      }

      body.password = password;
      const newUser = await UserModel.create(body);

      return response.status(201).json({
        message: "Usuário cadastrado com sucesso",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Erro ao cadastrar o usuário.",
        error: error.message,
      });
    }
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
