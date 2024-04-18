import ReservationDAO from "./reservationDAO.js";
import env from "dotenv";

env.config();

const restReservation = {
  getReservations: async function (req, res) {
    res.type("application/json");
    try {
      let rdao = new ReservationDAO();
      const reservations = await rdao.getAll();
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postReservations: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let rdao = new ReservationDAO();
      const reservations = await rdao.insert(data);
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deleteReservations: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putReservations: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getReservation: async function (req, res) {
    res.type("application/json");
    try {
      let rdao = new ReservationDAO();
      let id = req.params.id_reservation;
      const reservation = await rdao.getOne(id);
      res.send(JSON.stringify(reservation));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postReservation: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteReservation: async function (req, res) {
    res.type("application/json");
    try {
      let id = req.params.id_reservation;
      let rdao = new ReservationDAO();
      const reservation = await rdao.delete(id);
      res.send(JSON.stringify(reservation));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  putReservation: async function (req, res) {
    try {
      let rdao = new ReservationDAO();
      let id = req.params.id_reservation;
      const data = req.body;
      const reservation = await rdao.update(id, data);
      res.send(JSON.stringify(reservation));
      res.status(201);
    } catch (error) {
      console.log("error: " + error);
      res.status(500);
    }
  },

  checkAvailability: async function (req, res) {
    res.type("application/json");
    try {
      const { date, time } = req.body; // Extract date and time from request body
      let rdao = new ReservationDAO();
      const isAvailable = await rdao.checkAvailability(date, time); // Pass date and time to checkAvailability method
      res.send(JSON.stringify({ available: isAvailable }));
    } catch (error) {
      console.error("Error while checking availability:", error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },
};

export default restReservation;
