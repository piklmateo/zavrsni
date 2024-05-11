// OrderDAO.js
import DB from "../database.js";

class OrderDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getAll() {
    try {
      let sql = `SELECT 
      o.id_order,
      o.date,
      o.status,
      od.dish_id,
      d.name AS dish_name,
      od.quantity AS dish_quantity,
      NULL AS drink_id,
      NULL AS drink_name,
      NULL AS drink_quantity
      FROM 
          "order" o
      LEFT JOIN 
          order_dish od ON o.id_order = od.order_id
      LEFT JOIN 
          dish d ON od.dish_id = d.id_dish
      WHERE 
          o.status IN ('pending', 'preparing', 'done')
      UNION
      SELECT 
          o.id_order,
          o.date,
          o.status,
          NULL AS dish_id,
          NULL AS dish_name,
          NULL AS dish_quantity,
          odr.drink_id,
          dr.name AS drink_name,
          odr.quantity AS drink_quantity
      FROM 
          "order" o
      LEFT JOIN 
          order_drink odr ON o.id_order = odr.order_id
      LEFT JOIN 
          drink dr ON odr.drink_id = dr.id_drink
      WHERE 
          o.status IN ('pending', 'preparing', 'done')
      ORDER BY 
      id_order

  `;
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

  async getOrderStatus(id_order) {
    try {
      let sql = `SELECT "status" FROM "order" WHERE id_order=$1;`;
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
      let sql = `INSERT INTO "order" ("date", "bill", "table_id", "status") VALUES ($1, $2, $3, $4) RETURNING id_order`;
      let data = [order.date, order.bill, order.table_id || 1, "pending"];
      const result = await this.db.query(sql, data);
      return result.rows[0].id_order;
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
      let sql = `UPDATE "order" SET date=$1, bill=$2, table_id=$3, status=$4 WHERE id_order=$6`;
      let data = [order.date, order.bill, order.table_id, order.reservation_id, id_order];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating order:", error);
      throw error;
    }
  }

  async updateOrderStatus(id_order, status) {
    try {
      let sql = `UPDATE "order" SET "status"=$1 WHERE "id_order"=$2`;
      let data = [status, id_order];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating order:", error);
      throw error;
    }
  }
}

export default OrderDAO;
