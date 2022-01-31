"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Iron 1200",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Iron 883",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Forty Eight",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null);
  },
};
