/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productFeature', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      featureId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'feature',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productFeature');
  }
};