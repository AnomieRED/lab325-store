import { DataTypes } from '../syoss/DataTypes';
import { Model } from '../syoss/Model';
import { Syoss } from '../syoss/Syoss';

const { POSTGRES_USER,  POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD } = process.env;
const syoss = new Syoss(POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD, 5432);

class Product extends Model {
}

Product.init({
	name: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	},
	price: {
		type: DataTypes.INTEGER
	},
	manager_id: {
		type: DataTypes.INTEGER
	}
}, {
	modelName: 'products',
	syoss
});

export default Product;

// Product.create({ name: 'Monitor', description: 'For office', price: 2222, manager_id: 1 });
// Product.update(6, { name: 'HOBBIT', description: 'FRODO', price: 2010 });