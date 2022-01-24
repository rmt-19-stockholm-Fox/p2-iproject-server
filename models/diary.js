"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Diary.belongsTo(models.User, { foreignKey: "UserId" });
      Diary.belongsTo(models.Tag, { foreignKey: "TagId" });
    }
  }
  Diary.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
        },
      },
      story: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please input your story",
          },
        },
      },
      imageUrl: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      TagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Diary",
    }
  );
  return Diary;
};
