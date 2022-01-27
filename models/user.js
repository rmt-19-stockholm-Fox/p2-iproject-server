'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post);
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    pictureUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      async beforeCreate(user) {
        user.password = await bcrypt.hash(user.password);
      }
    }
  });
  return User;
};