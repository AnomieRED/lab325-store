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
			Feature.belongsToMany(models.Product, {
				through: 'productFeature',
				foreignKey: 'featureId'
			});
		}
	}
	
	Feature.init({
		title: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Feature',
		tableName: 'feature',
		timestamps: true
	});
	return Feature;
};