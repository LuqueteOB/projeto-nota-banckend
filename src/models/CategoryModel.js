const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");

class Category extends Model {}

Category.init(
  {
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
      defaultValue: false,
    },
  },
  {
    tableName: "Category",
    timestamps: true,
    sequelize: connection,
  }
);

module.exports = Category;
