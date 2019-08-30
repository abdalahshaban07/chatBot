'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('steps', [{
      categoryId: 1,
      name: 'account_inquiry',
      description: 'inquiry in account',
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'send-otp',
      description: 'will send otp to user to complete services',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'verify-otp',
      description: 'verfiy otp that send from befor',
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'choose your account',
      description: 'choose from account [current or saving ]',
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'choice-of-account',
      description: 'choose from account [current or saving ]',
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'balance',
      description: 'get balance for account',
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'current',
      description: 'current_balance',
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'saving',
      description: 'saving_balance',
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'transactions',
      description: 'get last 5 TRX for choice account',
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'current_transactions',
      description: 'get last 5 TRX for current account',
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 1,
      name: 'saving_transactions',
      description: 'get last 5 TRX for saving account',
      order: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 2,
      name: 'product_inquiry',
      description: 'inquery in product',
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 2,
      name: 'loans',
      description: 'calcult you amount of loans',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 2,
      name: 'your_amount',
      description: 'get amount of loans',
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 2,
      name: 'coming_amount',
      description: 'get amount monthly income',
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // {
    //   categoryId: 2,
    //   name: 'calculate loans',
    //   description: 'calculate loans',
    //   order: 4,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // },

    {
      categoryId: 3,
      name: 'card_services',
      description: 'inquiry in card services',
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 3,
      name: 'send-otp',
      description: 'will send otp to user to complete services',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 3,
      name: 'verify-otp',
      description: 'verfiy otp that send from befor',
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 3,
      name: 'balance',
      description: 'get balance from card',
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 3,
      name: 'transactions',
      description: 'get last 5 TRX for account',
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 3,
      name: 'active',
      description: 'active card if disable',
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 3,
      name: 'disable',
      description: 'disable card if active',
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 4,
      name: 'hello',
      description: 'hello',
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      categoryId: 4,
      name: 'how-can-help-you',
      description: 'help',
      order: 1,
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
