import Validator from 'fastest-validator';
import productSchema from '@validation/productSchema';
import managerSchema from '@validation/managerSchema';
const valid = new Validator();

export const validator = {
	product: (value) => {
		const check = valid.compile(productSchema);
		let product = check(value);
		if (product !== true) return product[0].message;
	},
	
	manager: (value) => {
		const check = valid.compile(managerSchema);
		let manager = check(value);
		if(manager !== true) return manager[0].message;
	}
}