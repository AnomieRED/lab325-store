/* eslint-disable */
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class productFeature extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		}
	}
	
	productFeature.init({
		value: DataTypes.STRING,
		productId: DataTypes.INTEGER,
		featureId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'productFeature',
		tableName: 'productFeature'
	});
	return productFeature;
};