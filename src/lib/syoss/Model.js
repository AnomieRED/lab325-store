import { DataTypes } from './DataTypes';

export class Model {
	constructor() {
		if (new.target === Model) throw new Error('Instance Error');
	}
	
	static firstName;
	static lastName; // todo убрать поля lastName/fisrtName
	static modelName; // todo сделать динамическую подстановку table name
	static syoss;
	static templates = {
		[DataTypes.BOOLEAN]: (value) => typeof value === 'boolean',
		[DataTypes.STRING]: (value) => typeof value == 'string',
		[DataTypes.FLOAT]: (value) => typeof value == 'number',
		[DataTypes.INTEGER]: (value) => Number.isInteger(value)
	};
	
	static init(attr, options) {
		this.syoss = options.syoss;
		this.firstName = options.firstName;
		this.lastName = options.lastName;
		this.modelName = attr.modelName;
	}
	
	static async create(attr) {
		const keys = Object.keys(attr).join(', ');
		const value = Object.values(attr).map(res => `'${res}'`)
			.join(', ');
		const query = `INSERT INTO ${}(${keys}) VALUES(${value})`;
		const addProduct = await this.syoss.query(query);
		if (addProduct.rowCount === 1) {
			return console.log('PRODUCT ADDED');
		}
	}
	
	static async findById(id) {
		if (typeof id !== 'number' || !id) {
			throw new Error('Check your product ID');
		}
		const query = `SELECT * FROM products WHERE id = ${id}`;
		const findProduct = await this.syoss.query(query);
		if (findProduct.rowCount === 1) {
			return console.log('FIND PRODUCT');
		} else {
			throw new Error('PRODUCT NOT FOUND');
		}
	}
	
	static async update(id, attr) {
		if (typeof id !== 'number' || !id) {
			throw new Error('Check your product ID');
		}
		let inputUpdate = '';
		Object.entries(attr).forEach(([key, value]) => {
			inputUpdate += `${key} = '${value}', `;
		});
		const update = inputUpdate.slice(0, -2);
		const query = `UPDATE products SET ${update} WHERE id = ${id}`;
		const updateProduct = await this.syoss.query(query);
		if (updateProduct.rowCount === 0) {
			return console.log('PRODUCT UPDATED');
		}
	}
	
	static async delete(id) {
		if (typeof id !== 'number' || !id) {
			throw new Error('Check your product ID');
		}
		const query = `DELETE FROM products WHERE id = ${id}`;
		const deleteProduct = await this.syoss.query(query);
		if (deleteProduct.rowCount === 0) {
			return console.log('PRODUCT DELETED');
		}
	}
	
	static validator(attr) {
		for (const [key, value] of Object.entries(attr)) {
			const { type } = value;
			const valid = this.templates[type];
			if (!valid(attr[key])) return false;
		}
		return true;
	}
}