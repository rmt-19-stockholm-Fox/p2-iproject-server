"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "UsersId" });
      Product.belongsToMany(models.User, {
        through: "Bookmark",
        foreign: "ProductId",
      });
      Product.belongsTo(models.Category, { foreignKey: "CategoriesId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name is required",
          },
          notNull: {
            args: true,
            msg: "Name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description is required",
          },
          notNull: {
            args: true,
            msg: "Description is required",
          },
        },
      },
      image1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Image is required",
          },
          notNull: {
            args: true,
            msg: "Image is required",
          },
        },
      },
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      UsersId: DataTypes.INTEGER,
      CategoriesId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
