/* eslint-disable */
const {
  ON_SALE,
  NOT_AVAILABLE
} = require('@enum');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'role',
      [
        {
          name: 'customer'
        },
        {
          name: 'admin'
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {});
  }
};
