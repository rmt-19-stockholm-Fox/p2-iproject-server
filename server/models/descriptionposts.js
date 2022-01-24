'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DescriptionPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DescriptionPosts.init({
    destination: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    schedule: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DescriptionPosts',
  });
  return DescriptionPosts;
};