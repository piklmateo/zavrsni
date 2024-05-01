// TableDAO.js
import DB from "../database.js";

class TableDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getAll() {
    try {
      let sql = `
        SELECT * from "table";
      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all tables:", error);
      throw error;
    }
  }

  async getOne(id_table) {
    try {
      let sql = `SELECT * FROM "table" WHERE id_table=$1;`;
      const data = await this.db.query(sql, [id_table]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting table by id_table:", error);
      throw error;
    }
  }

  async insert(table) {
    try {
      let sql = `INSERT INTO "table" ("number", "quantity") VALUES ($1,$2)`;
      let data = [table.number, table.quantity];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting table:", error);
      throw error;
    }
  }

  async delete(id_table) {
    try {
      let sql = `DELETE FROM "table" WHERE id_table=$1`;
      await this.db.query(sql, [id_table]);
      return true;
    } catch (error) {
      console.error("Error while deleting table:", error);
      throw error;
    }
  }

  async update(id_table, table) {
    try {
      let sql = `UPDATE "table" SET "number"=$1, "quantity"=$2 WHERE id_table=$4`;
      let data = [table.number, table.quantity, , id_table];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating table:", error);
      throw error;
    }
  }
}

export default TableDAO;
