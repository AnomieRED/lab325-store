import { DataTypes } from '../syoss/DataTypes';
import { Model } from '../syoss/Model';
import { Syoss } from '../syoss/Syoss';

const {
	POSTGRES_USER,
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_PASSWORD
} = process.env;
const syoss = new Syoss(POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD, 5432);

class Manager extends Model {
}

Manager.init({
	name: {
		type: DataTypes.STRING
	},
	surname: {
		type: DataTypes.STRING
	},
	phone: {
		type: DataTypes.INTEGER
	}
}, {
	modelName: 'manager',
	syoss
});

export default Manager;
