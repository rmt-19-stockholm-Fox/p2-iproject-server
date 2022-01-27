'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User);
    }
  }
  Post.init({
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    imageUrls: DataTypes.TEXT,
    placeName: DataTypes.STRING,
    placeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};