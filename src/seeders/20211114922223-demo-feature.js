/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'feature',
			[
				{
					title: 'Color',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Diagonal',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'Height',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					title: 'CPU',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			]);
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('feature', null, {});
	}
};