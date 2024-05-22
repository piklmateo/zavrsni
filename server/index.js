import express from "express";
import env from "dotenv";
import session from "express-session";
import restUser from "./servis/user/restUser.js";
import restReservation from "./servis/reservation/restReservation.js";
import restDish from "./servis/dish/restDish.js";
import restDrink from "./servis/drink/restDrink.js";
import restOrder from "./servis/order/restOrder.js";
import restOrderDish from "./servis/order_dish/restOrderDish.js";
import restOrderDrink from "./servis/order_drink/restOrderDrink.js";
import restTable from "./servis/table/restTable.js";
import restStatistics from "./servis/statistics/restStatistics.js";
import cors from "cors";
import jwt from "./modules/jwt.js";

env.config();
const server = express();
const port = process.env.SERVER_PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

function startServer() {
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());

  server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    next();
  });

  server.use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 3 },
      resave: false,
    })
  );

  prepareUserPaths();
  prepareReservationPaths();
  prepareDishPaths();
  prepareDrinkPaths();
  prepareOrderPaths();
  prepareCategoryPaths();
  prepareOrderDishPaths();
  prepareOrderDrinkPaths();
  prepareTablePaths();
  prepareStatisticsPaths();

  server.use((req, res) => {
    res.status(404);
    let message = { error: "Page not found" };
    res.json(message);
  });

  server.listen(port, () => {
    console.log("Server is running at: http://localhost:" + port);
  });
}

//PITATI ZAŠTO JE TAKO (POST /api/users/:username blokira /api/users/register)
//1 - admin
//2 - kuhar
//3 - konobar
//4 - korisnik

function prepareUserPaths() {
  server.post("/api/users/register", restUser.registerUser);
  server.post("/api/users/login", restUser.loginUser);

  server.get("/api/users", jwt.verifyToken, restUser.getUsers);
  server.post("/api/users", jwt.verifyToken, restUser.postUsers);
  server.put("/api/users", jwt.verifyToken, restUser.putUsers);
  server.delete("/api/users", jwt.verifyToken, jwt.verifyRole([1]), restUser.deleteUsers);

  server.get("/api/users/:id_user", jwt.verifyToken, restUser.getUser);
  server.get("/api/users/:username", jwt.verifyToken, restUser.getUserByUsername);
  server.post("/api/users/:id_user", jwt.verifyToken, restUser.postUser);
  server.put("/api/users/:id_user", jwt.verifyToken, restUser.putUser);
  server.delete("/api/users/:id_user", jwt.verifyToken, jwt.verifyRole([1]), restUser.deleteUser);

  server.get("/api/users/reservations/:id", jwt.verifyToken, restReservation.getReservationsUser);
  server.get("/api/users/reservations/special/:id", jwt.verifyToken, restReservation.getSpecialReservationsUser);
}

function prepareReservationPaths() {
  server.get("/api/reservations", jwt.verifyToken, restReservation.getReservations);
  server.get("/api/reservations/standard", jwt.verifyToken, restReservation.getReservationsNoWholeDay);
  server.get("/api/reservations/special", jwt.verifyToken, restReservation.getReservationsWholeDay);
  server.get("/api/reservations/bookedDate", restReservation.getBookedDates);
  server.get("/api/reservations/bookedTime/:date", restReservation.getBookedTimeSlots);
  server.get("/api/reservations/bookedTables/:date/:time", restReservation.getBookedTables);

  server.post("/api/reservations", restReservation.postReservations);
  server.put("/api/reservations", jwt.verifyToken, jwt.verifyRole([1]), restReservation.putReservations);
  server.delete("/api/reservations", jwt.verifyToken, jwt.verifyRole([1]), restReservation.deleteReservations);

  server.get("/api/reservations/:id", jwt.verifyToken, restReservation.getReservation);
  server.post("/api/reservations/:id", jwt.verifyToken, restReservation.postReservation);
  server.put("/api/reservations/:id", jwt.verifyToken, restReservation.putReservation);
  server.delete("/api/reservations/:id", jwt.verifyToken, restReservation.deleteReservation);
}

function prepareDishPaths() {
  server.get("/api/dishes", restDish.getDishes);
  server.post("/api/dishes", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDish.postDishes);
  server.put("/api/dishes", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDish.putDishes);
  server.delete("/api/dishes", jwt.verifyToken, jwt.verifyRole([1, 2]), restDish.deleteDishes);

  server.get("/api/dishes/:id", restDish.getDish);
  server.post("/api/dishes/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDish.postDish);
  server.put("/api/dishes/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDish.putDish);
  server.delete("/api/dishes/:id", jwt.verifyToken, jwt.verifyRole([1, 2]), restDish.deleteDish);
}

function prepareCategoryPaths() {
  server.get("/api/categories", restDish.getCategories);
}

function prepareDrinkPaths() {
  server.get("/api/drinks", restDrink.getDrinks);
  server.post("/api/drinks", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDrink.postDrinks);
  server.put("/api/drinks", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDrink.putDrinks);
  server.delete("/api/drinks", jwt.verifyToken, jwt.verifyRole([1, 2]), restDrink.deleteDrinks);

  server.get("/api/drinks/:id", restDrink.getDrink);
  server.post("/api/drinks/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDrink.postDrink);
  server.put("/api/drinks/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restDrink.putDrink);
  server.delete("/api/drinks/:id", jwt.verifyToken, jwt.verifyRole([1, 2]), restDrink.deleteDrink);
}

function prepareOrderPaths() {
  server.get("/api/orders", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.getOrders);
  server.post("/api/orders", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.postOrders);
  server.put("/api/orders", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.putOrders);
  server.delete("/api/orders", jwt.verifyToken, jwt.verifyRole([1]), restOrder.deleteOrders);

  server.get("/api/orders/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.getOrder);
  server.get("/api/orders/status/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.getOrderStatus);
  server.post("/api/orders/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.postOrder);

  server.patch("/api/orders/status/:id_order", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.putOrderStatus);

  server.put("/api/orders/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrder.putOrder);

  server.delete("/api/orders/:id", jwt.verifyToken, jwt.verifyRole([1]), restOrder.deleteOrder);
}

function prepareOrderDishPaths() {
  server.get("/api/order-dish", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDish.getOrderDishes);
  server.post("/api/order-dish", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDish.postOrderDishes);
  server.put("/api/order-dish", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDish.putOrderDishes);
  server.delete("/api/order-dish", jwt.verifyToken, jwt.verifyRole([1]), restOrderDish.deleteOrderDishes);

  server.get("/api/order-dish/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDish.getOrderDish);
  server.post("/api/order-dish/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDish.postOrderDish);
  server.put("/api/order-dish/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDish.putOrderDish);
  server.delete("/api/order-dish/:id", jwt.verifyToken, jwt.verifyRole([1]), restOrderDish.deleteOrderDish);
}

function prepareOrderDrinkPaths() {
  server.get("/api/order-drink", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDrink.getOrderDrinks);
  server.post("/api/order-drink", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDrink.postOrderDrinks);
  server.put("/api/order-drink", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDrink.putOrderDrinks);
  server.delete("/api/order-drink", jwt.verifyToken, jwt.verifyRole([1]), restOrderDrink.deleteOrderDrinks);

  server.get("/api/order-drink/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDrink.getOrderDrink);
  server.post("/api/order-drink/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDrink.postOrderDrink);
  server.put("/api/order-drink/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restOrderDrink.putOrderDrink);
  server.delete("/api/order-drink/:id", jwt.verifyToken, jwt.verifyRole([1]), restOrderDrink.deleteOrderDrink);
}

function prepareTablePaths() {
  server.get("/api/tables", restTable.getTables);
  server.post("/api/tables", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restTable.getTables);
  server.put("/api/tables", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restTable.getTables);
  server.delete("/api/tables", jwt.verifyToken, jwt.verifyRole([1]), restTable.getTables);

  server.get("/api/tables/:id", restTable.getTable);
  server.post("/api/tables/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restTable.postTable);
  server.put("/api/tables/:id", jwt.verifyToken, jwt.verifyRole([1, 2, 3]), restTable.putTable);
  server.delete("/api/tables/:id", jwt.verifyToken, jwt.verifyRole([1]), restTable.deleteTable);
}

function prepareStatisticsPaths() {
  server.get("/api/statistics/popular/timeSlots", restStatistics.getPopularTimeSlots);
  server.get("/api/statistics/popular/dishes", restStatistics.getPopularDishes);
  server.get("/api/statistics/popular/drinks", restStatistics.getPopularDrinks);
}

startServer();
