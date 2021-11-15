/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'products',
			[
				{
					name: 'Table',
					description: 'made in USA',
					price: 4000,
					manager_id: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Monitor',
					description: 'QHD 2k 144Hz',
					price: 11000,
					manager_id: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Lamp',
					description: 'made in China',
					price: 800,
					manager_id: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Notebook',
					description: 'for game',
					price: 25000,
					manager_id: 2,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {});
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('products', null, {});
	}
};
