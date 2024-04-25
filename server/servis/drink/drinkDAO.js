// DrinkDAO.js
import DB from "../database.js";

class DrinkDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getAll() {
    try {
      let sql = `
        SELECT d.*, c.name AS category_name
        FROM "drink" d
        INNER JOIN "category" c ON d.category_id = c.id_category ORDER BY id_drink ASC;
      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all drinks:", error);
      throw error;
    }
  }

  async getOne(id_drink) {
    try {
      let sql = `SELECT * FROM "drink" WHERE id_drink=$1;`;
      const data = await this.db.query(sql, [id_drink]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting drink by id_drink:", error);
      throw error;
    }
  }

  async insert(drink) {
    try {
      let sql = `INSERT INTO "drink" ("name", price, category_id) VALUES ($1,$2,$3)`;
      let data = [drink.name, drink.price, drink.category_id || 1];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting drink:", error);
      throw error;
    }
  }

  async delete(id_drink) {
    try {
      let sql = `DELETE FROM "drink" WHERE id_drink=$1`;
      await this.db.query(sql, [id_drink]);
      return true;
    } catch (error) {
      console.error("Error while deleting drink:", error);
      throw error;
    }
  }

  async update(id_drink, drink) {
    try {
      let sql = `UPDATE "drink" SET "name"=$1, price=$2, category_id=$3 WHERE id_drink=$4`;
      let data = [drink.name, drink.price, drink.category_id || 1, id_drink];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating drink:", error);
      throw error;
    }
  }
}

export default DrinkDAO;
