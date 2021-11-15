/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
			'product_features',
	    [
		    {
					product_id: 1,
			    feature_id: 1,
			    title: 'Color',
			    createdAt: new Date(),
			    updatedAt: new Date()
		    },
		    {
			    product_id: 2,
			    feature_id: 2,
			    title: 'Diagonal',
			    createdAt: new Date(),
			    updatedAt: new Date()
		    },
		    {
			    product_id: 3,
			    feature_id: 3,
			    title: 'Height',
			    createdAt: new Date(),
			    updatedAt: new Date()
		    },
		    {
			    product_id: 4,
			    feature_id: 4,
			    title: 'CPU',
			    createdAt: new Date(),
			    updatedAt: new Date()
		    }
	    ], {});
  },

  down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('product_features', null, {});
  }
};
