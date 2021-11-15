/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'features',
			[
				{
					value: 'Black',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					value: '27d',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					value: '20cm',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					value: 'Ryzen',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			]);
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('features', null, {});
	}
};
