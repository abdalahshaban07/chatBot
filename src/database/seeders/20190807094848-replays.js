'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Replays', [{
      intention: 'balance',
      replay: 'balance',
      requiredOtp: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      intention: 'transactions',
      replay: 'transactions',
      requiredOtp: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      intention: 'loans',
      replay: 'loans',
      requiredOtp: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      intention: 'disable',
      replay: 'disable',
      requiredOtp: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      intention: 'active',
      replay: 'active',
      requiredOtp: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      intention: 'hello',
      replay: 'hello',
      requiredOtp: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      intention: 'saving',
      replay: 'saving',
      requiredOtp: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      intention: 'current',
      replay: 'current',
      requiredOtp: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      // {
      //   intention: 'saving balance',
      //   replay: 'saving_balance',
      //   requiredOtp: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   intention: 'current balance',
      //   replay: 'current_balance',
      //   requiredOtp: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   intention: 'current_transactions',
      //   replay: 'transactions',
      //   requiredOtp: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   intention: 'saving_transactions',
      //   replay: 'transactions',
      //   requiredOtp: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
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
