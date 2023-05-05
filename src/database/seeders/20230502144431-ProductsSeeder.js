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
    await queryInterface.bulkInsert('products', [{
        model: 'Monza Sp2',
        year: 2020,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        price: 256,
        image : 'ferrari-monza.jpg' ,
        products_brands_id: 1 
       },
       {
        model: 'Veneno',
        year: 2022,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' ,
        price: 350 ,
        image : 'labo-veneno3.jpg',
        products_brands_id: 2 
       },
       {
        model: 'Sian',
        year: 2021,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' ,
        price: 445,
        image : 'labo-sian6.jpg',
        products_brands_id: 2
       },
       {
        model: '765LT spider',
        year: 2021,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' ,
        price: 455,
        image : 'mclaren4.jpg',
        products_brands_id: 7
       },
       {
        model: 'Dawn Black Badge',
        year: 2020,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' ,
        price: 356,
        image : 'roy.jpg',
        products_brands_id: 4
       },
       {
        model: '918 Spyder',
        year: 2023 ,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' ,
        price: 359 ,
        image :'pors.jpg',
        products_brands_id: 5 
       }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};
