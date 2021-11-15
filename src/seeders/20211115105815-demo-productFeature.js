/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'productFeature',
			[
				{
					productId: 1,
					featureId: 1,
					title: 'Color',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					productId: 2,
					featureId: 2,
					title: 'Diagonal',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					productId: 3,
					featureId: 3,
					title: 'Height',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					productId: 4,
					featureId: 4,
					title: 'CPU',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {});
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('productFeature', null, {});
	}
};
