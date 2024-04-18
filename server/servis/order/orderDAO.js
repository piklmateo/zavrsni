// OrderDAO.js
import DB from "../database.js";

class OrderDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getAll() {
    try {
      let sql = `SELECT * FROM "order";`;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all orders:", error);
      throw error;
    }
  }

  async getOne(id_order) {
    try {
      let sql = `SELECT * FROM "order" WHERE id_order=$1;`;
      const data = await this.db.query(sql, [id_order]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting order by id:", error);
      throw error;
    }
  }

  async insert(order) {
    try {
      let sql = `INSERT INTO "order" ("date", "bill", "table_id", "reservation_id") VALUES ($1,$2,$3,$4)`;
      let data = [order.date, order.bill, order.table_id || 1, order.reservation_id || 1];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting order:", error);
      throw error;
    }
  }

  async delete(id_order) {
    try {
      let sql = `DELETE FROM "order" WHERE id_order=$1`;
      await this.db.query(sql, [id_order]);
      return true;
    } catch (error) {
      console.error("Error while deleting order:", error);
      throw error;
    }
  }

  async update(id_order, order) {
    try {
      let sql = `UPDATE "order" SET date=$1, bill=$2, table_id=$3, reservation_id=$4 WHERE id_order=$6`;
      let data = [order.date, order.bill, order.table_id, order.reservation_id, id_order];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating order:", error);
      throw error;
    }
  }
}

export default OrderDAO;
