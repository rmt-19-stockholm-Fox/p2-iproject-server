'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Destination cannot be empty'},
        notNull: {msg: 'Destination cannot be empty'}
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Image cannot be empty'},
        notNull: {msg: 'Image cannot be empty'}
      }
    },
    schedule: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Schedule cannot be empty'},
        notNull: {msg: 'Schedule cannot be empty'}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Price cannot be empty'},
        notNull: {msg: 'Price cannot be empty'}
      }
    },
    travelPostId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};