import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

console.log(process.env.DATABASE_URL);

// DATABASE_URL should be a full postgres connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // optional: add ssl config for production
  // ssl: { rejectUnauthorized: false }
});

// Helper query wrapper - returns rows or throws
export async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export default pool;
