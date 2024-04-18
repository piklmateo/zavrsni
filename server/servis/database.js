import pg from "pg";
import env from "dotenv";

class DB {
  constructor() {
    env.config();
    this.db = new pg.Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async connect() {
    await this.db.connect();
  }

  async disconnect() {
    await this.db.end();
  }

  async query(sql, params) {
    return await this.db.query(sql, params);
  }
}

export default DB;
