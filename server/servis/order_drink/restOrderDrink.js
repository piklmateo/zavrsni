import OrderDrinkDAO from "./orderDrinkDAO.js";
import env from "dotenv";

env.config();

const restOrderDrink = {
  getOrderDrinks: async function (req, res) {
    res.type("application/json");
    try {
      let odao = new OrderDrinkDAO();
      const OrderDrinks = await odao.getAll();
      res.send(JSON.stringify(OrderDrinks));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postOrderDrinks: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let odao = new OrderDrinkDAO();
      const OrderDrinks = await odao.insert(data);
      res.send(JSON.stringify(OrderDrinks));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deleteOrderDrinks: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putOrderDrinks: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getOrderDrink: async function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  postOrderDrink: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteOrderDrink: async function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putOrderDrink: async function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },
};

export default restOrderDrink;
