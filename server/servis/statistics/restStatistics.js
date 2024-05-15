import StatisticsDAO from "./statisticsDAO.js";
import env from "dotenv";

env.config();

const restStatistics = {
  getPopularTimeSlots: async function (req, res) {
    res.type("application/json");
    try {
      let sdao = new StatisticsDAO();
      const statistics = await sdao.getPopularTimeSlots();
      res.send(JSON.stringify(statistics));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getPopularDishes: async function (req, res) {
    res.type("application/json");
    try {
      let sdao = new StatisticsDAO();
      const statistics = await sdao.getPopularDishes();
      res.send(JSON.stringify(statistics));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getPopularDrinks: async function (req, res) {
    res.type("application/json");
    try {
      let sdao = new StatisticsDAO();
      const statistics = await sdao.getPopularDrinks();
      res.send(JSON.stringify(statistics));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },
};

export default restStatistics;
