/* eslint-disable */
import { ON_SALE, NOT_AVAILABLE } from '../constants/ProductEnum';

const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Product.belongsTo(models.Manager, {
				foreignKey: {
					name: 'managerId',
					allowNull: false
				}
			});
			Product.belongsToMany(models.Feature, {
				through: 'productFeature',
				foreignKey: 'productId'
			});
		}
	}
	
	Product.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		price: DataTypes.INTEGER,
		availability: DataTypes.ENUM(ON_SALE, NOT_AVAILABLE),
		managerId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Product',
		tableName: 'product',
		timestamps: true
	});
	return Product;
};