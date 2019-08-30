'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transactions', [{
      type: 'fawry',
      amount: 100,
      description: 'this transaction done with fawry',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'fawry',
      amount: 800,
      description: 'this transaction done with fawry',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'credit card',
      amount: 2000,
      description: 'this transaction done with credit card',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'credit card',
      amount: 1000,
      description: 'this transaction done with credit card',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'fawry',
      amount: 400,
      description: 'this transaction done with fawry',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: 'fawry',
      amount: 500,
      description: 'this transaction done with fawry',
      UserId: 1,
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
