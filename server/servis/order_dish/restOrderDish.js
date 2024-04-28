import OrderDishDAO from "./orderDishDAO.js";
import env from "dotenv";

env.config();

const restOrderDish = {
  getOrderDishes: async function (req, res) {
    res.type("application/json");
    try {
      let odao = new OrderDishDAO();
      const OrderDishes = await odao.getAll();
      res.send(JSON.stringify(OrderDishes));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postOrderDishes: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let odao = new OrderDishDAO();
      const OrderDishes = await odao.insert(data);
      res.send(JSON.stringify(OrderDishes));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deleteOrderDishes: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putOrderDishes: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getOrderDish: async function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  postOrderDish: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteOrderDish: async function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putOrderDish: async function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },
};

export default restOrderDish;
