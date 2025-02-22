// import "dotenv/config";
import { configDotenv } from "dotenv";

import pg from "pg";

configDotenv({
	path: [".env.local", ".env"],
});

const { Pool } = pg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

export default pool;
