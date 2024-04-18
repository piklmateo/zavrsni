import DishDAO from "./dishDAO.js";
import env from "dotenv";

env.config();

const restDish = {
  getDishes: async function (req, res) {
    res.type("application/json");
    try {
      let ddao = new DishDAO();
      const dishes = await ddao.getAll();
      res.send(JSON.stringify(dishes));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postDishes: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let ddao = new DishDAO();
      const dishes = await ddao.insert(data);
      res.send(JSON.stringify(dishes));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deleteDishes: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putDishes: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getDish: async function (req, res) {
    res.type("application/json");
    try {
      let ddao = new DishDAO();
      let id = req.params.id_dish;
      const dish = await ddao.getOne(id);
      res.send(JSON.stringify(dish));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postDish: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteDish: async function (req, res) {
    res.type("application/json");
    try {
      let id = req.params.id_dish;
      let ddao = new DishDAO();
      const dish = await ddao.delete(id);
      res.send(JSON.stringify(dish));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  putDish: async function (req, res) {
    try {
      let ddao = new DishDAO();
      let id = req.params.id_dish;
      const data = req.body;
      const dish = await ddao.update(id, data);
      res.send(JSON.stringify(dish));
      res.status(201);
    } catch (error) {
      console.log("error: " + error);
      res.status(500);
    }
  },

  getCategories: async function (req, res) {
    res.type("application/json");
    try {
      let ddao = new DishDAO();
      const categories = await ddao.getCategories();
      res.send(JSON.stringify(categories));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },
};

export default restDish;
