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
      WITH time_slots AS (
        SELECT '12:00:00'::time AS "time"
        UNION ALL SELECT '13:30:00'::time
        UNION ALL SELECT '15:00:00'::time
        UNION ALL SELECT '16:30:00'::time
        UNION ALL SELECT '18:00:00'::time
        UNION ALL SELECT '19:30:00'::time
        UNION ALL SELECT '21:00:00'::time
      )
      SELECT ts."time", COUNT(r."time") AS reservation_count
      FROM time_slots ts
      LEFT JOIN "reservation" r ON ts."time" = r."time"
      GROUP BY ts."time"
      ORDER BY ts."time" ASC;
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
