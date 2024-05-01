import TableDAO from "./TableDAO.js";
import env from "dotenv";

env.config();

const restTable = {
  getTables: async function (req, res) {
    res.type("application/json");
    try {
      let tdao = new TableDAO();
      const tables = await tdao.getAll();
      res.send(JSON.stringify(tables));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postTables: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let tdao = new TableDAO();
      const tables = await tdao.insert(data);
      res.send(JSON.stringify(tables));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deletetables: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  puttables: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getTable: async function (req, res) {
    res.type("application/json");
    try {
      let tdao = new TableDAO();
      let id = req.params.id_table;
      const table = await tdao.getOne(id);
      res.send(JSON.stringify(table));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postDrink: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteTable: async function (req, res) {
    res.type("application/json");
    try {
      let id = req.params.id_table;
      let tdao = new TableDAO();
      const table = await tdao.delete(id);
      res.send(JSON.stringify(table));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  putTable: async function (req, res) {
    try {
      let tdao = new TableDAO();
      let id = req.params.id_table;
      const data = req.body;
      const table = await tdao.update(id, data);
      res.send(JSON.stringify(table));
      res.status(201);
    } catch (error) {
      console.log("error: " + error);
      res.status(500);
    }
  },
};

export default restTable;
