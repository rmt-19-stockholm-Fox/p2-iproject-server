"use strict";
const { hashPassword } = require("../helpers/bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "seller@mail.com",
        username: "Seller",
        role: "Seller",
        phoneNumber: "12345",
        address: "address",
        password: hashPassword("12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "customer@mail.com",
        username: "Customer",
        role: "Customer",
        phoneNumber: "12345",
        address: "address",
        password: hashPassword("12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null);
  },
};
