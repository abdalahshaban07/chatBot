'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
      expDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      userPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      currentStep: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      defaultStep: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      searchQuery: {
        type: Sequelize.STRING,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    return queryInterface.dropTable('sessions');
  }
};
