'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      categoryName: 'account_inquiry',
      description: 'inquery in account',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryName: 'product_inquiry',
      description: 'inquery in product',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryName: 'card_services',
      description: 'inquiry in card services',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryName: 'hello',
      description: 'hello',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
