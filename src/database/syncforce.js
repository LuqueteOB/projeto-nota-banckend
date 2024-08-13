const connection = require("../config/connection");

require("../models/UserModel");
require("../models/OptionsProdutos");
require("../models/ProdutosModel");
require("../models/CategoryModel");
require("../models/ProdutosCategory");
require("../models/ImageModel");

connection.sync({ force: true });
