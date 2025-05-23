import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  user: 'postgres',
  password: 'Deepak@2721',
  host: 'localhost',
  port: 5432,
  database: 'drizzledemo',
});
export const db = drizzle(pool, { schema });