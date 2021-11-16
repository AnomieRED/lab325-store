/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'product',
			[
				{
					name: 'Table',
					description: 'made in USA',
					price: 4000,
					managerId: 1,
					characterId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Monitor',
					description: 'QHD 2k 144Hz',
					price: 11000,
					managerId: 2,
					characterId: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Lamp',
					description: 'made in China',
					price: 800,
					managerId: 1,
					characterId: 3,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Notebook',
					description: 'for game',
					price: 25000,
					managerId: 2,
					characterId: 4,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {});
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product', null, {});
	}
};
