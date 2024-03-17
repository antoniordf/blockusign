import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Define a type for the configuration object
interface PoolConfig {
  user: string | undefined;
  host: string | undefined;
  database: string | undefined;
  password: string | undefined;
  port: number | undefined;
  ssl: { rejectUnauthorized: boolean } | undefined;
}

// Prepare the configuration object
const poolConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  ssl:
    process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
};

// Create a new pool instance with the configuration
const pool = new Pool(poolConfig);

export default pool;
