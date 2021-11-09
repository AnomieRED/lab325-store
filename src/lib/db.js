import { Pool } from 'pg';

const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env;

const client = new Pool({
	user: POSTGRES_USER,
	host: POSTGRES_HOST,
	database: POSTGRES_DB,
	password: POSTGRES_PASSWORD,
	port: 5432
});
client.connect();

export default client;