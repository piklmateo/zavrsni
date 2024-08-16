import pg from "pg";
import env from "dotenv";

class DB {
  constructor() {
    env.config();
    this.pool = new pg.Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  }

  async query(sql, params) {
    const client = await this.pool.connect(); // Acquire a client from the pool
    try {
      const query = await client.query(sql, params); // Execute the query
      return query;
    } catch (error) {
      throw error;
    } finally {
      client.release(); // Release the client back to the pool
    }
  }

  async endPool() {
    await this.pool.end(); // Close all connections in the pool
  }
}

export default DB;
