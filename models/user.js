'use strict';
const {
  Model
} = require('sequelize');
const { hassPass } = require('../helpers/bycrypt');
const randomAvatar = require('../helpers/avatarRandomizer')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "Username must be unique"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
      }
    },
    bod: DataTypes.DATE,
    gender: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    
    user.password = hassPass(user.password);
    user.avatar = randomAvatar()
    
  })

  return User;
};