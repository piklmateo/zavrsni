// order_drinkDrinkDAO.js
import DB from "../database.js";

class order_drinkDrinkDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getAll() {
    try {
      let sql = `SELECT * FROM "order_drink";`;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all order_drinks:", error);
      throw error;
    }
  }

  async insert(order_drink) {
    try {
      let sql = `INSERT INTO "order_drink" ("order_id", "drink_id", "quantity") VALUES ($1,$2,$3)`;
      let data = [
        order_drink.order_id || 1,
        order_drink.drink_id || 1,
        order_drink.quantity,
      ];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting order_drink:", error);
      throw error;
    }
  }
}

export default order_drinkDrinkDAO;
