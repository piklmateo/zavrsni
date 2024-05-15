// StatisticsDAO.js
import DB from "../database.js";

class StatisticsDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getPopularTimeSlots() {
    try {
      let sql = `
        SELECT "time", COUNT(*) AS reservation_count
        FROM "reservation"
        GROUP BY "time"
        ORDER BY reservation_count DESC;
      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }

  async getPopularDishes() {
    try {
      let sql = `
        SELECT d.name AS dish_name, COALESCE(SUM(od.quantity), 0) AS total_quantity
        FROM dish d
        LEFT JOIN order_dish od ON d.id_dish = od.dish_id
        GROUP BY d.name
        ORDER BY total_quantity DESC;
      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }

  async getPopularDrinks() {
    try {
      let sql = `
        SELECT d.name AS drink_name, COALESCE(SUM(od.quantity), 0) AS total_quantity
        FROM drink d
        LEFT JOIN order_drink od ON d.id_drink = od.drink_id
        GROUP BY d.name
        ORDER BY total_quantity DESC;
      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }
}

export default StatisticsDAO;
