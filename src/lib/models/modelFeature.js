import { DataTypes } from '../syoss/DataTypes';
import { Model } from '../syoss/Model';
import { Syoss } from '../syoss/Syoss';

const { POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD } = process.env;
const syoss = new Syoss(POSTGRES_USER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD, 5432);

class Feature extends Model {
}

Feature.init({
	key: {
		type: DataTypes.STRING
	},
	value: {
		type: DataTypes.STRING
	}
}, {
	modelName: 'feature',
	syoss
});

export default Feature;
