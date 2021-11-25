/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			email: {
				type: Sequelize.STRING,
				unique: true
			},
			password: {
				type: Sequelize.STRING
			},
			role: {
				type: Sequelize.INTEGER,
				references: {
					model: 'role',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
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
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('user');
	}
};