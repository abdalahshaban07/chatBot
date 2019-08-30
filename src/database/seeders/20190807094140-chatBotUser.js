'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'abdalah',
      email: 'a@a.com',
      mpin: '123456',
      phone: '01126246811',
      totalBalance: 1000,
      savingBalance: 300,
      currentBalance: 1000,
      statues: 'disable',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'az',
      email: 'az@a.com',
      mpin: '12345',
      phone: '01091199959',
      totalBalance: 3000,
      savingBalance: 600,
      currentBalance: 700,
      statues: 'disable',
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
