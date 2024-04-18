import DrinkDAO from "./drinkDAO.js";
import env from "dotenv";

env.config();

const restDrink = {
  getDrinks: async function (req, res) {
    res.type("application/json");
    try {
      let ddao = new DrinkDAO();
      const drinks = await ddao.getAll();
      res.send(JSON.stringify(drinks));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postDrinks: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let ddao = new DrinkDAO();
      const drinks = await ddao.insert(data);
      res.send(JSON.stringify(drinks));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deleteDrinks: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putDrinks: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getDrink: async function (req, res) {
    res.type("application/json");
    try {
      let ddao = new DrinkDAO();
      let id = req.params.id_drink;
      const drink = await ddao.getOne(id);
      res.send(JSON.stringify(drink));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postDrink: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteDrink: async function (req, res) {
    res.type("application/json");
    try {
      let id = req.params.id_drink;
      let ddao = new DrinkDAO();
      const drink = await ddao.delete(id);
      res.send(JSON.stringify(drink));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  putDrink: async function (req, res) {
    try {
      let ddao = new DrinkDAO();
      let id = req.params.id_drink;
      const data = req.body;
      const drink = await ddao.update(id, data);
      res.send(JSON.stringify(drink));
      res.status(201);
    } catch (error) {
      console.log("error: " + error);
      res.status(500);
    }
  },
};

export default restDrink;
