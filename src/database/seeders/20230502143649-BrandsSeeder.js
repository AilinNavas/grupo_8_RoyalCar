'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products_brands', [{
        name: 'Ferrari',
      },
      {
        name: 'Lamborghini',
      },{
        name: 'Maserati',
      },{
        name: 'Rolls Royce',
      },
      {
        name: 'Porsche',
      },
      {
        name: 'Aston Martin',
      },
      {
        name: 'McLaren',
      },
      {
        name: 'Tesla',
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products_brands', null, {});
     
  }
};
