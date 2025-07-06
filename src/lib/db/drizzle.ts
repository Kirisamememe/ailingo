import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../drizzle/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * データベース
 */
export const db = drizzle({ client: pool, schema });
