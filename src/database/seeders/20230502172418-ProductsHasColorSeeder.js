'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products_has_colors', [{
      products_id: 1,
      colors_id: 2
    },
    {
      products_id: 2,
      colors_id: 2
    },
    {
      products_id: 2,
      colors_id: 1
    },
    {
      products_id: 3,
      colors_id: 4
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products_has_colors', null, {});

  }
};
