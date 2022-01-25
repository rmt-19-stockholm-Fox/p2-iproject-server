'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TravelPost.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Name cannot be empty'},
        notNull: {msg: 'Name cannot be empty'}
      }
    },
    detailId: {
      type: DataTypes.INTEGER,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Summary cannot be empty'},
        notNull: {msg: 'Summary cannot be empty'}
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Date cannot be empty'},
        notNull: {msg: 'Date cannot be empty'}
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'ImageUrl cannot be empty'},
        notNull: {msg: 'ImageUrl cannot be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'TravelPost',
  });
  return TravelPost;
};