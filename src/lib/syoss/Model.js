import { DataTypes } from './DataTypes';

export class Model {
	constructor() {
		if (new.target === Model) throw new Error('Instance Error');
	}
	
	static modelName;
	static syoss;
	static templates = {
		[DataTypes.BOOLEAN]: (value) => typeof value === 'boolean',
		[DataTypes.STRING]: (value) => typeof value === 'string',
		[DataTypes.FLOAT]: (value) => typeof value === 'number',
		[DataTypes.INTEGER]: (value) => Number.isInteger(value)
	};
	
	/**
	 * Syoss init
	 * @param {Object} attr - Input table rows and type.
	 * @param {Object} options - Model table name.
	 * @param {string} options.modelName
	 * @param {Syoss} options.syoss
	 */
	static init(attr, options) {
		this.validator(attr);
		this.syoss = options.syoss;
		this.modelName = options.modelName;
	}
	
	static async create(attr) {
		this.validator(attr);
		const keys = Object.keys(attr).join(', ');
		const value = Object.values(attr).map(res => `'${res}'`)
			.join(', ');
		const query = `INSERT INTO ${this.modelName} (${keys}) VALUES(${value}) RETURNING*`;
		const createItem = await this.syoss.query(query);
		if (createItem.rowCount === 1) {
			return createItem.rows[0];
		}
	}
	
	static async findById(id) {
		if (id === ' ') throw new Error('ID can not be empty');
		const query = `SELECT * FROM ${this.modelName} WHERE id = ${Number(id)}`;
		const findById = await this.syoss.query(query);
		if (findById.rowCount === 1) {
			return findById.rows[0];
		} else {
			throw new Error('NOT FOUND');
		}
	}
	
	/** Find all with pagination
	 * @param {Number} offset
	 * @param {Number} limit
	 */
	static async findAll(offset, limit) {
		const query = `SELECT * FROM ${this.modelName} LIMIT ${limit} OFFSET ((${offset} - 1) * ${limit})`;
		const findAll = await this.syoss.query(query);
		if (findAll.rowCount !== 0) {
			return findAll.rows;
		} else {
			throw new Error('NOT FOUND');
		}
	}
	
	static async update(id, attr) {
		if (id === ' ') throw new Error('ID can not be empty');
		this.validator(attr);
		let inputUpdate = '';
		Object.entries(attr).forEach(([key, value]) => {
			inputUpdate += `${key} = '${value}', `;
		});
		const sliceUpdate = inputUpdate.slice(0, -2);
		const query = `UPDATE ${this.modelName} SET ${sliceUpdate} WHERE id = ${Number(id)} RETURNING*`;
		const updateItem = await this.syoss.query(query);
		if (updateItem.rowCount === 1) {
			return updateItem.rows[0];
		} else {
			throw new Error('ERROR UPDATE');
		}
	}
	
	static async delete(id) {
		if (id === ' ') throw new Error('ID can not be empty');
		const query = `DELETE FROM ${this.modelName} WHERE id = ${Number(id)}`;
		const deleteItem = await this.syoss.query(query);
		if (deleteItem.rowCount === 1) {
			return 'true';
		} else {
			return deleteItem.command;
		}
	}
	
	static validator(attr) {
		for (const [key, value] of Object.entries(attr)) {
			const { type } = value;
			if (!attr[value]) return false;
			const valid = this.templates[type];
			if (!valid(attr[key])) return false;
		}
		return true;
	}
}