// ReservationDAO.js
import DB from "../database.js";

class ReservationDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getAll() {
    try {
      let sql = `
      SELECT
      COALESCE(u.name, r.name) AS name,
      COALESCE(u.email, r.email) AS email,
      COALESCE(u.phone, r.phone) AS phone,
      r.date,
      r.time,
      t.number AS table_number,
      r.id_reservation
      FROM reservation r
      LEFT JOIN "user" u ON r.user_id = u.id_user
      LEFT JOIN "table" t ON r.table_id = t.id_table
      ORDER BY r.date DESC;

      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }

  async getOne(id_reservation) {
    try {
      let sql = `SELECT * FROM "reservation" WHERE id_reservation=$1;`;
      const data = await this.db.query(sql, [id_reservation]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting Reservation by id:", error);
      throw error;
    }
  }

  async insert(reservation) {
    try {
      let sql = `INSERT INTO "reservation" ("date", "time", "email", user_id, table_id, "name", "phone") VALUES ($1,$2,$3,$4,$5,$6,$7)`;
      let data = [
        reservation.date,
        reservation.time,
        reservation.email,
        reservation.user_id,
        reservation.table_id,
        reservation.name,
        reservation.phone,
      ];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting Reservation:", error);
      throw error;
    }
  }

  async delete(id_reservation) {
    try {
      let sql = `DELETE FROM "reservation" WHERE id_reservation=$1`;
      await this.db.query(sql, [id_reservation]);
      return true;
    } catch (error) {
      console.error("Error while deleting Reservation:", error);
      throw error;
    }
  }

  async update(id_reservation, reservation) {
    try {
      let sql = `UPDATE "reservation" SET date=$1, time=$2, occupied=$3, email=$4, table_id=$5, user_id WHERE id_reservation=$6`;
      let data = [
        reservation.date,
        reservation.time,
        reservation.occupied,
        reservation.email,
        reservation.table_id,
        reservation.user_id,
        id_reservation,
      ];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating Reservation:", error);
      throw error;
    }
  }

  async checkAvailability(date, time) {
    try {
      let sql = `SELECT * FROM "reservation" WHERE date=$1 AND time=$2;`;
      const data = await this.db.query(sql, [date, time]);
      return data.rows.length === 0;
    } catch (error) {
      console.error("Error while checking availability:", error);
      throw error;
    }
  }
}

export default ReservationDAO;
