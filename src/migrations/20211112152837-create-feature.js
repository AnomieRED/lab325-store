/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('feature', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING
			},
			// productId: {
			// 	type: Sequelize.INTEGER,
			// 	references: {
			// 		model: 'product',
			// 		key: 'id'
			// 	},
			// 	onUpdate: 'CASCADE',
			// 	onDelete: 'CASCADE'
			// },
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('feature');
	}
};