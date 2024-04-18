// userDAO.js
import DB from "../database.js";

class UserDAO {
  constructor() {
    this.db = new DB();
    this.db.connect();
  }

  async getAll() {
    try {
      let sql = `SELECT * FROM "user";`;
      const data = await this.db.query(sql, []);
      const rows = data.rows;
      return rows;
    } catch (error) {
      console.error("Error while getting all users:", error);
      throw error;
    }
  }

  async getOne(username) {
    try {
      let sql = `SELECT * FROM "user" WHERE username=$1;`;
      const data = await this.db.query(sql, [username]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting user by username:", error);
      throw error;
    }
  }

  async getProfileData(id_user) {
    try {
      let sql = `SELECT * FROM "user" WHERE id_user=$1;`;
      const data = await this.db.query(sql, [id_user]);
      const rows = data.rows;
      return rows.length === 1 ? rows[0] : null;
    } catch (error) {
      console.error("Error while getting user by id:", error);
      throw error;
    }
  }

  async insert(user) {
    try {
      let sql = `INSERT INTO "user" (name, surname, phone, password, role_id, email, username) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
      let data = [
        user.name,
        user.surname,
        user.phone,
        user.password,
        user.role_id || 1,
        user.email,
        user.username,
      ];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while inserting user:", error);
      throw error;
    }
  }

  async delete(username) {
    try {
      let sql = `DELETE FROM "user" WHERE username=$1`;
      await this.db.query(sql, [username]);
      return true;
    } catch (error) {
      console.error("Error while deleting user:", error);
      throw error;
    }
  }

  async update(username, user) {
    try {
      let sql = `UPDATE "user" SET name=$1, surname=$2, phone=$3, password=$4, email=$5 WHERE username=$6`;
      let data = [
        user.name,
        user.surname,
        user.phone,
        user.password,
        user.email,
        username,
      ];
      await this.db.query(sql, data);
      return true;
    } catch (error) {
      console.error("Error while updating user:", error);
      throw error;
    }
  }
}

export default UserDAO;
