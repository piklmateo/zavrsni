import DB from "../database.js";

class DishDAO {
  constructor() {
    this.db = new DB();
  }

  async getAll() {
    try {
      let sql = `
        SELECT d.*, c.name AS category_name
        FROM "dish" d
        INNER JOIN "category" c ON d.category_id = c.id_category ORDER BY id_dish ASC;
      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all dishes:", error);
      throw error;
    }
  }

  async getOne(id_dish) {
    try {
      let sql = `SELECT * FROM "dish" WHERE "id_dish"=$1;`;
      const data = await this.db.query(sql, [id_dish]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting dish by id_dish:", error);
      throw error;
    }
  }

  async getCategories() {
    try {
      let sql = `SELECT DISTINCT *
                 FROM category`;
      const data = await this.db.query(sql);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting categories:", error);
      throw error;
    }
  }

  async getOne(id_dish) {
    try {
      let sql = `SELECT * FROM "dish" WHERE "id_dish"=$1;`;
      const data = await this.db.query(sql, [id_dish]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting dish by id_dish:", error);
      throw error;
    }
  }

  async insert(dish) {
    try {
      let sql = `INSERT INTO "dish" ("name", ingridients, price, category_id) VALUES ($1,$2,$3,$4)`;
      let data = [dish.name, dish.ingridients, dish.price, dish.category_id];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting dish:", error);
      throw error;
    }
  }

  async delete(id_dish) {
    try {
      let sql = `DELETE FROM "dish" WHERE id_dish=$1`;
      await this.db.query(sql, [id_dish]);
      return true;
    } catch (error) {
      console.error("Error while deleting dish:", error);
      throw error;
    }
  }

  async update(id_dish, dish) {
    try {
      let sql = `UPDATE "dish" SET "name"=$1, ingridients=$2, price=$3, category_id=$4 WHERE id_dish=$5`;
      let data = [
        dish.name,
        dish.ingridients,
        dish.price,
        dish.category_id || 1,
        id_dish,
      ];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating dish:", error);
      throw error;
    }
  }
}

export default DishDAO;
