import { DataTypes } from '../syoss/DataTypes';
import { Model } from '../syoss/Model';
import { Syoss } from '../syoss/Syoss';

const { POSTGRES_USER,  POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD } = process.env;
const syoss = new Syoss(POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD, 5432);

class Product extends Model {
}

Product.init({
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING
	}
}, {
	modelName: 'products',
	syoss
});


// Product.create({ name: 'Table', description: 'For office', price: 2222, manager_id: 1 });
// Product.findById(1)
// Product.delete(5);
// Product.update(6, { name: 'BOOK', description: 'GREEN' });

Product.validator('string');