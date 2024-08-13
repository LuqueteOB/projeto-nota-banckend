const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");

class ProdutosModel extends Model {
  static associate() {
    ProdutosModel.belongsToMany(CategoryModel, {
      through: ProdutosCategory,
      foreignKey: "category_id",
      otherKey: "product_id",
    });
  }
}

ProdutosModel.init(
  {
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "produtos",
    timestamps: true,
    sequelize: connection,
  }
);

module.exports = ProdutosModel;
