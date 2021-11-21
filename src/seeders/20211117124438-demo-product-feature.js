/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'productFeature',
			[
				{
					productId: 1,
					featureId: 1,
					value: 'Black'
				},
				{
					productId: 2,
					featureId: 2,
					value: '27d'
				},
				{
					productId: 3,
					featureId: 3,
					value: '40cm'
				},
				{
					productId: 4,
					featureId: 4,
					value: 'Ryzen'
				}
			], {});
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('productFeature', null, {});
	}
};
