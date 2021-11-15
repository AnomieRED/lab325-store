/* eslint-disable */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_features extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product_features.belongsTo(models.Products, {foreignKey: 'product_id'});
      Product_features.belongsTo(models.Feature, {foreignKey: 'feature_id'});
    }
  }
  Product_features.init({
    title: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    feature_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_features',
    tableName: 'product_features'
  });
  return Product_features;
};