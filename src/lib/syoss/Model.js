import { DataTypes } from './DataTypes';
import FilterModel from '@filter/filterModel';

export class Model {
	static modelName;
	static syoss;
	
	constructor() {
		if (new.target === Model) throw new Error('Instance Error');
	}
	
	/**
	 * Syoss init
	 * @param {Object} attr - Input table rows and type.
	 * @param {Object} options - Model table name.
	 * @param {string} options.modelName
	 * @param {Syoss} options.syoss
	 */
	static init(attr, options) {
		Model.#validator(attr);
		this.syoss = options.syoss;
		this.modelName = options.modelName;
	}
	
	static async create(attr) {
		Model.#validator(attr);
		const keys = Object.keys(attr)
			.join(', ');
		const value = Object.values(attr)
			.map(res => `'${res}'`)
			.join(', ');
		const query = `INSERT INTO ${this.modelName} (${keys}) VALUES(${value}) RETURNING*`;
		const createItem = await this.syoss.query(query);
		if (createItem.rowCount === 1) {
			return createItem.rows[0];
		}
	}
	
	static async findById(id) {
		if (id === ' ') throw new Error('ID cannot be empty');
		const query = `SELECT * FROM ${this.modelName} WHERE id = ${Number(id)}`;
		const findById = await this.syoss.query(query);
		if (findById.rowCount === 1) {
			return findById.rows[0];
		} else {
			throw new Error('NOT FOUND');
		}
	}
	
	/** Find all with pagination
	 * @param {Object} options - Input object for item filtering
	 */
	static async findAll(options) {
		/**
		 * @param {Object} options.where.or -Input object for condition AND / OR
		 */
		if (options?.where?.or) {
			const filter = FilterModel.findByConditionOr(options);
			const query = `SELECT * FROM ${this.modelName} WHERE ${filter[0]}(${filter[1]})`;
			console.log('Options OR: ', query);
			const findByFilter = await this.syoss.query(query);
			if (findByFilter.rowCount !== 0) {
				return findByFilter.rows;
			} else {
				throw new Error('NOT FOUND');
			}
			
			/** Find all with pagination
			 * @param {Object} options.where - Input object for condition AND
			 */
		} else if (options?.where) {
			const filter = FilterModel.findByConditionAnd(options);
			const query = `SELECT * FROM ${this.modelName} WHERE ${filter}`;
			console.log('Options AND: ', query);
			const findByFilter = await this.syoss.query(query);
			if (findByFilter.rowCount !== 0) {
				return findByFilter.rows;
			} else {
				throw new Error('NOT FOUND');
			}
		} else {
			const query = `SELECT * FROM ${this.modelName}`;
			const findAll = await this.syoss.query(query);
			if (findAll.rowCount !== 0) {
				return findAll.rows;
			} else {
				throw new Error('NOT FOUND');
			}
		}
	}
	
	static async update(id, attr) {
		if (id === ' ') throw new Error('ID cannot be empty');
		Model.#validator(attr);
		let inputUpdate = '';
		Object.entries(attr)
			.forEach(([key, value]) => {
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
	
	static #validator(attr) {
		if (!attr) throw new Error('Fields cannot be empty');
		const value = Object.values(attr);
		let result;
		value.forEach(data => {
			switch (data) {
				case DataTypes.STRING:
					result = typeof data === 'string';
					break;
				case DataTypes.INTEGER:
					result = typeof data === 'number';
					break;
				case DataTypes.FLOAT:
					result = typeof data === 'number';
					break;
				case DataTypes.BOOLEAN:
					result = typeof data === 'boolean';
					break;
				default:
					result = false;
			}
		});
		return result;
	}
}