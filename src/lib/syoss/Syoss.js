import { Pool } from 'pg';

export class Syoss {
	_db;
	constructor(user, host, database, password, { port = 5432 } = {}) {
		const pool = new Pool({
			user,
			host,
			database,
			password,
			port
		});
		pool.connect();
		this._db = pool;
	}
	
	query(query) {
		return this._db.query(query);
	}
	
}

