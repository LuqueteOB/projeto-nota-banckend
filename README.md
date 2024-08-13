# Este é o Projeto do Curso Formação em Desenvolvedor Web - Online da Geração Tech

Bem-vindo ao meu projeto de Back-end! Este projeto utiliza uma variedade de bibliotecas e ferramentas para criar uma aplicação moderna e estilizada.

=============================================================

## Descrição

Este é o backend do Projecto da Geração Tech, uma aplicação que utiliza Node.js, Express.js e Sequelize para criar uma API RESTful. O projeto também inclui autenticação com JWT e armazenamento seguro de variáveis de ambiente com Dotenv.

=============================================================

# Índice

Instalação

Configuração

Uso

Scripts

Dependências

Estrutura do Projeto

Contribuição

Licença

==========================================================

# Instalação

Clone o repositório:

git clone https://github.com/LuqueteOB/projeto-nota-banckend.git

Navegue até o diretório do projeto:

cd projecto-nota-backend

Instale as dependências:

npm install

======================================================

# Configuração

Crie um arquivo .env na raiz do projeto com as seguintes
variáveis:

env

APP_KEY_TOKEN='sua_chave_secreta'

Configure o banco de dados MySQL com as credenciais especificadas no arquivo .env.

=======================================================

# Uso

Inicie o servidor:

npm start
O servidor estará disponível em http://localhost:3000.

A API estará disponível para receber requisições HTTP.

=======================================================

# Scripts

start: Inicia o servidor utilizando Nodemon.
test: Script de teste (atualmente sem especificação).
Dependências
crypto-js: Biblioteca para criptografia em JavaScript.
dotenv: Carrega variáveis de ambiente de um arquivo .env.
express: Framework web minimalista para Node.js.
jsonwebtoken: Implementação do JWT (JSON Web Token) para autenticação.
mysql2: Driver para MySQL em Node.js.
nodemon: Ferramenta que reinicia automaticamente o servidor ao detectar mudanças.
sequelize: ORM para Node.js que suporta várias bases de dados.

=======================================================

# Estrutura do Projeto

projecto-nota-backend/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── app.js
│ └── server.js
├── tests/
├── .env
├── package.json
└── README.md

src/controllers: Controladores para gerenciar as requisições e respostas.
src/models: Modelos Sequelize que representam as tabelas do banco de dados.
src/routes: Rotas da API.
src/services: Configuração e inicialização do servidor.
src/utils: Utilitários e helpers do projeto.
tests/: Diretório para testes.
