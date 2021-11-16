/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'feature',
			[
				{
					title: 'Color',
					value: 'Black',
					productId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Diagonal',
					value: '27d',
					productId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Height',
					value: '40cm',
					productId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'CPU',
					value: 'Ryzen',
					productId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			]);
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('feature', null, {});
	}
};