import { Pool } from 'pg';

export class RootConfig {
  static pool: Pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  constructor() {}
}
