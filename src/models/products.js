/* eslint-disable */
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Products extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Products.belongsTo(models.Manager, { foreignKey: 'manager_id' });
			Products.hasMany(models.Product_features, {
				foreignKey: 'product_id',
				onDelete: 'cascade',
				onUpdate: 'cascade'
			});
		}
	}
	
	Products.init({
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		price: DataTypes.INTEGER,
		manager_id: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Products',
		tableName: 'products'
	});
	return Products;
};