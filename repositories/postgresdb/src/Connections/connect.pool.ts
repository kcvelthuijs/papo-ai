import dotenv from 'dotenv';
import { Pool } from 'pg';

// Get connection data from the environment
const result = dotenv.config({ debug: true, override: true });
if (result.error) throw result.error;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST || '127.0.0.1',
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT || '5432')
});

async function verifyConnection(): Promise<void> {
  try {
    // Attempt to acquire a client from the pool
    const client = await pool.connect();
    console.log('db user', process.env.PGUSER || '<unknown>');
    console.log('✅ Connected to PostgreSQL database');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
}

// Immediately verify connection upon module load.
verifyConnection();

// Export the pool to be used across the application.
export default pool;
