/* eslint-disable */
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Manager extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Manager.hasMany(models.Products, {
				foreignKey: 'manager_id',
				onDelete: 'cascade',
				onUpdate: 'cascade'
			});
		}
	}
	
	Manager.init({
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		phone: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Manager',
		tableName: 'managers'
	});
	return Manager;
};