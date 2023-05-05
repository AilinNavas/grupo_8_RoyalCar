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
    await queryInterface.bulkInsert('users', [
       {
          name: 'Walter',
          last_name: 'Barboza' ,
        email: 'wbarboza97@gmail.com',
          password:'$2a$10$G8AgQYRUJNj58O0lOX8sLeEwc3U.jy.Y04lgYiXJqVmg0uuX/dJ/i' ,
          avatar: '1680893397778-descarga.jpg' ,
         roles_id : 1,
       },
        {
        name: 'Dosi',
        last_name: 'Astall' ,
       email: 'dastall9@cdbaby.com',
        password:'LjyeUOas08Pu' ,
        avatar: '1680890487455-ferrari-monza2.jpgg' ,
       roles_id : 1,
       }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
     
  }
};
