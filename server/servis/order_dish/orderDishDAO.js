import DB from "../database.js";

class orderDishDAO {
  constructor() {
    this.db = new DB();
  }

  async getAll() {
    try {
      let sql = `SELECT * FROM "order_dish";`;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all order_dishes:", error);
      throw error;
    }
  }

  async insert(order_dish) {
    try {
      let sql = `INSERT INTO "order_dish" ("order_id", "dish_id", "quantity") VALUES ($1,$2,$3)`;
      let data = [
        order_dish.order_id || 1,
        order_dish.dish_id || 1,
        order_dish.quantity,
      ];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting order_dish:", error);
      throw error;
    }
  }
}

export default orderDishDAO;
