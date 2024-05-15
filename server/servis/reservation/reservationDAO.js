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
      r.id_reservation,
      r.whole_day
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

  async getAllNoWholeDay() {
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
      WHERE r.whole_day='no'
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

  async getAllWholeDay() {
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
      WHERE r.whole_day='yes'
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

  async getBookedDates() {
    try {
      let sql = `
      WITH time_slots AS (
        SELECT '12:00:00'::time AS time_slot UNION
        SELECT '13:30:00'::time AS time_slot UNION
        SELECT '15:00:00'::time AS time_slot UNION
        SELECT '16:30:00'::time AS time_slot UNION
        SELECT '18:00:00'::time AS time_slot UNION
        SELECT '19:30:00'::time AS time_slot UNION
        SELECT '21:00:00'::time AS time_slot 
        )
        SELECT r1.date
        FROM reservation r1
        LEFT JOIN (
            SELECT date, time, COUNT(DISTINCT table_id) AS total_tables
            FROM reservation
            GROUP BY date, time
        ) r2 ON r1.date = r2.date AND r2.time IN (
            SELECT time_slot FROM time_slots
        )
        LEFT JOIN (
            SELECT COUNT(DISTINCT id_table) AS total_tables
            FROM "table"
        ) t ON r2.total_tables = t.total_tables
        GROUP BY r1.date, r1.whole_day
        HAVING COUNT(DISTINCT r2.time) = (SELECT COUNT(*) FROM time_slots)
            OR r1.whole_day = 'yes';
      `;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }

  async getBookedTimeSlots(date) {
    try {
      let sql = `
      WITH available_slots AS (
          SELECT '12:00:00'::time AS time_slot UNION
          SELECT '13:30:00'::time AS time_slot UNION
          SELECT '15:00:00'::time AS time_slot UNION
          SELECT '16:30:00'::time AS time_slot UNION
          SELECT '18:00:00'::time AS time_slot UNION
          SELECT '19:30:00'::time AS time_slot UNION
          SELECT '21:00:00'::time AS time_slot 
      ),
      occupied_slots AS (
          SELECT "time" AS time_slot, COUNT(*) AS occupied_tables
          FROM reservation
          WHERE date("date") = $1
          GROUP BY "time"
      )
      SELECT available_slots.time_slot
      FROM available_slots
      JOIN occupied_slots ON available_slots.time_slot = occupied_slots.time_slot
      WHERE occupied_tables = (SELECT COUNT(*) FROM "table");
      `;
      const data = await this.db.query(sql, [date]);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }

  async getBookedTables(date, time) {
    try {
      let sql = `
      SELECT DISTINCT 
      CASE 
          WHEN r.whole_day = 'yes' THEN t.id_table
          ELSE r.table_id
      END AS table_id
      FROM 
          reservation r
          LEFT JOIN "table" t ON r.whole_day = 'yes'
      WHERE 
          r."date" = $1 
          AND r."time" = $2;
      `;
      const data = await this.db.query(sql, [date, time]);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }

  async getAllUser(id_user) {
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
      WHERE user_id=$1 AND whole_day='no' 
      ORDER BY r.date DESC;
      `;
      const data = await this.db.query(sql, [id_user]);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all reservations:", error);
      throw error;
    }
  }

  async getAllUserSpecial(id_user) {
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
      WHERE user_id=$1 AND whole_day='yes' 
      ORDER BY r.date DESC;
      `;
      const data = await this.db.query(sql, [id_user]);
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
      let sql = `INSERT INTO "reservation" ("date", "time", "email", user_id, table_id, "name", "phone", "whole_day") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
      let data = [
        reservation.date,
        reservation.time,
        reservation.email,
        reservation.user_id,
        reservation.table_id,
        reservation.name,
        reservation.phone,
        reservation.whole_day,
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
}

export default ReservationDAO;
