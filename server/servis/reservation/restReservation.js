import ReservationDAO from "./reservationDAO.js";
import sendMail from "../../modules/mailer.js";
import { formatDate } from "../../helpers/dateTimeFormat.js";
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

  getReservationsNoWholeDay: async function (req, res) {
    res.type("application/json");
    try {
      let rdao = new ReservationDAO();
      const data = req.query;
      const reservations = await rdao.getAllNoWholeDay(data.limit, data.page);
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getReservationsWholeDay: async function (req, res) {
    res.type("application/json");
    try {
      let rdao = new ReservationDAO();
      const data = req.query;
      const reservations = await rdao.getAllWholeDay(data.limit, data.page);
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getBookedDates: async function (req, res) {
    res.type("application/json");
    try {
      let rdao = new ReservationDAO();
      const reservations = await rdao.getBookedDates();
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getBookedTimeSlots: async function (req, res) {
    res.type("application/json");
    try {
      let rdao = new ReservationDAO();
      const date = req.params.date;
      const reservations = await rdao.getBookedTimeSlots(date);
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getBookedTables: async function (req, res) {
    res.type("application/json");
    try {
      let rdao = new ReservationDAO();
      const date = req.params.date;
      const time = req.params.time;
      const reservations = await rdao.getBookedTables(date, time);
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getReservationsUser: async function (req, res) {
    res.type("application/json");
    try {
      let id = req.params.id;
      let rdao = new ReservationDAO();
      const reservations = await rdao.getAllUser(id);
      res.send(JSON.stringify(reservations));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getSpecialReservationsUser: async function (req, res) {
    res.type("application/json");
    try {
      let id = req.params.id;
      let rdao = new ReservationDAO();
      const reservations = await rdao.getAllUserSpecial(id);
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
      await rdao.insert(data);

      const from = process.env.MAIL_USER;
      const to = data.email;
      const subject = "Reservation Confirmation";
      const message = `Dear ${data.name},\n\nYour reservation for ${formatDate(data.date)} at ${
        data.time
      } has been confirmed. We look forward to seeing you!`;

      await sendMail(from, to, subject, message);

      res.send(JSON.stringify({ success: true }));
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
};

export default restReservation;
