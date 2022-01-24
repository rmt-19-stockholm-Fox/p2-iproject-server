"use strict";
const fs = require("fs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const tag = require("../tag.json");
    tag.forEach((v) => {
      delete v.id;
      v.createdAt = new Date();
      v.updatedAt = new Date();
    });
    queryInterface.bulkInsert("Tags", tag);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
