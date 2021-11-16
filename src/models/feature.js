/* eslint-disable */
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Feature extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Feature.belongsTo(models.Product, { foreignKey: 'productId' });
		}
	}
	
	Feature.init({
		title: DataTypes.STRING,
		value: DataTypes.STRING,
		productId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Feature',
		tableName: 'feature'
	});
	return Feature;
};