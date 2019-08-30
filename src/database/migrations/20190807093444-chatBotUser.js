'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      email: {
        type: Sequelize.STRING,
        unique: false,
        defaultValue: 'a@payme.co'

      },
      mpin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false

      },
      totalBalance: {
        type: Sequelize.INTEGER,

        defaultValue: 1000
      },
      savingBalance: {
        type: Sequelize.INTEGER,

        defaultValue: 1000
      },
      currentBalance: {
        type: Sequelize.INTEGER,
        defaultValue: 1000
      },
      statues: {
        type: Sequelize.STRING,
        defaultValue: 'active',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('Users');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
