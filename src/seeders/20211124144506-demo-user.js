/* eslint-disable */
import bcrypt from 'bcrypt';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'user',
			[
				{
					email: 'user@gmail.com',
					password: await bcrypt.hash('user', 5),
					role: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					email: 'admin@gmail.com',
					password: await bcrypt.hash('admin', 5),
					role: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {});
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('user', null, {});
	}
};
