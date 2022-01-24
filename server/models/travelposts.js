'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TravelPosts.init({
    name: DataTypes.STRING,
    descriptionId: DataTypes.INTEGER,
    summary: DataTypes.STRING,
    date: DataTypes.DATE,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TravelPosts',
  });
  return TravelPosts;
};