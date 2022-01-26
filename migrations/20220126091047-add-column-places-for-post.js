'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Posts', 'placeName', Sequelize.STRING);
    await queryInterface.addColumn('Posts', 'placeId', Sequelize.STRING);
    await queryInterface.addIndex('Posts', ['placeId']);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('Posts', 'post_place_id');
    await queryInterface.removeColumn('Posts', 'placeId');
    await queryInterface.removeColumn('Posts', 'placeName');
  }
};
