/* eslint-disable */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'managers',
			[
				{
					name: 'John',
					surname: 'Doe',
					phone: '380939312336',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Alex',
					surname: 'Boe',
					phone: '380939312338',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			], {});
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('managers', null, {});
	}
};
