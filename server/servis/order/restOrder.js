import OrderDAO from "./orderDAO.js";
import env from "dotenv";

env.config();

const restOrder = {
  getOrders: async function (req, res) {
    res.type("application/json");
    try {
      let odao = new OrderDAO();
      const orders = await odao.getAll();
      res.send(JSON.stringify(orders));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postOrders: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let odao = new OrderDAO();
      const orders = await odao.insert(data);
      res.send(JSON.stringify(orders));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deleteOrders: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putOrders: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getOrder: async function (req, res) {
    res.type("application/json");
    try {
      let odao = new OrderDAO();
      let id = req.params.id_order;
      const order = await odao.getOne(id);
      res.send(JSON.stringify(order));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postOrder: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteOrder: async function (req, res) {
    res.type("application/json");
    try {
      let id = req.params.id_order;
      let odao = new OrderDAO();
      const order = await odao.delete(id);
      res.send(JSON.stringify(order));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  putOrder: async function (req, res) {
    try {
      let odao = new OrderDAO();
      let id = req.params.id_order;
      const data = req.body;
      const order = await odao.update(id, data);
      res.send(JSON.stringify(order));
      res.status(201);
    } catch (error) {
      console.log("error: " + error);
      res.status(500);
    }
  },
};

export default restOrder;
