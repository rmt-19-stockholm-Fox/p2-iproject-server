"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "UsersId" });
      User.belongsToMany(models.Product, {
        through: "Bookmark",
        foreignKey: "UsersId",
      });
      User.hasMany(models.Transaction, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Username is required",
          },
          notNull: {
            args: true,
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exist!",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Please input the correct email format!",
          },
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          notNull: {
            args: true,
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5],
            msg: "Password must be at least 5 characters",
          },
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
          notNull: {
            args: true,
            msg: "Password is required",
          },
        },
      },
      role: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Phone number is a required",
          },
          notNull: {
            args: true,
            msg: "Phone number is a required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Address is a required",
          },
          notNull: {
            args: true,
            msg: "Address is a required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync(8);
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
  return User;
};
