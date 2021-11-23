/* eslint-disable */
import { ON_SALE, NOT_AVAILABLE } from '../constants/ProductEnum';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('product', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			price: {
				type: Sequelize.FLOAT
			},
			availability: {
				type: Sequelize.ENUM(
					ON_SALE,
					NOT_AVAILABLE
				)
			},
			managerId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'manager',
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
		await queryInterface.dropTable('product');
	}
};