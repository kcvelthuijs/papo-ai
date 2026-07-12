import postgres from 'postgres';
import dotenv from 'dotenv';

// Get connection data from the environment
dotenv.config();
const connection = process.env.DATABASE_URL || '';

// use database environment from .env file
const sql = postgres(connection, {}); // use environment variables

export default sql;
