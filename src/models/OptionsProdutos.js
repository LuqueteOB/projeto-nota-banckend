const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");
const ProdutosModel = require("./ProdutosModel");

class OptionsProdutos extends Model {}

OptionsProdutos.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProdutosModel,
        key: "id",
      },
      onDelete: "NO ACTION",
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
      onDelete: "NO ACTION",
    },
    shape: {
      type: DataTypes.ENUM("square", "circle"),
      allowNull: true,
      defaultValue: "square",
      onDelete: "NO ACTION",
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      onDelete: "NO ACTION",
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      onDelete: "NO ACTION",
    },
    type: {
      type: DataTypes.ENUM("text", "color"),
      allowNull: true,
      defaultValue: "text",
      onDelete: "NO ACTION",
    },
    values: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    tableName: "opcoes_produtos",
    timestamps: false,
    sequelize: connection,
  }
);

module.exports = OptionsProdutos;
