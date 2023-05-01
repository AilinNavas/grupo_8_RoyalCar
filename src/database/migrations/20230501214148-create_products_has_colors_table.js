'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('products_has_colors', { 
      id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    products_id: {
      type: Sequelize.INTEGER.UNSIGNED,
      references: {
        model: 'products',
        key: 'id'
      }
  },
  colors_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    references: {
      model: 'products_colors',
      key: 'id'
    } }
  
    
  });
},

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('products_has_colors');
     
  }
};
