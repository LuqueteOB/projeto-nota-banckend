const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");
const ProdutosModel = require("./ProdutosModel");
const Category = require("./CategoryModel");

class ProdutosCategory extends Model {}

ProdutosCategory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProdutosModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "relacoes",
    timestamps: false,
    sequelize: connection,
  }
);

module.exports = ProdutosCategory;
