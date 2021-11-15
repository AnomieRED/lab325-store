/* eslint-disable */
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
			Product.belongsTo(models.Manager, { foreignKey: 'managerId' });
			Product.hasMany(models.ProductFeature, {
				foreignKey: 'productId',
				onDelete: 'cascade',
				onUpdate: 'cascade'
			});
		}
	}
	
	Product.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		price: DataTypes.INTEGER,
		managerId: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Product',
		tableName: 'product'
	});
	return Product;
};