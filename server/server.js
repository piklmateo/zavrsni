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
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
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
function prepareUserPaths() {
  server.post("/api/users/register", restUser.registerUser);
  server.post("/api/users/login", restUser.loginUser);

  server.get("/api/users", jwt.verifyToken, restUser.getUsers);
  server.post("/api/users", jwt.verifyToken, restUser.postUsers);
  server.put("/api/users", jwt.verifyToken, restUser.putUsers);
  server.delete("/api/users", jwt.verifyToken, restUser.deleteUsers);

  server.get("/api/users/:id_user", jwt.verifyToken, restUser.getUser);
  server.get(
    "/api/users/:username",
    jwt.verifyToken,
    restUser.getUserByUsername
  );
  server.post("/api/users/:id_user", jwt.verifyToken, restUser.postUser);
  server.put("/api/users/:id_user", jwt.verifyToken, restUser.putUser);
  server.delete("/api/users/:id_user", jwt.verifyToken, restUser.deleteUser);
}

function prepareReservationPaths() {
  server.get(
    "/api/reservations",
    jwt.verifyToken,
    restReservation.getReservations
  );
  server.post(
    "/api/reservations/check",
    jwt.verifyToken,
    restReservation.checkAvailability
  );
  server.post("/api/reservations", restReservation.postReservations);
  server.put(
    "/api/reservations",
    jwt.verifyToken,
    restReservation.putReservations
  );
  server.delete(
    "/api/reservations",
    jwt.verifyToken,
    restReservation.deleteReservations
  );

  server.get(
    "/api/reservations/:id",
    jwt.verifyToken,
    restReservation.getReservation
  );
  server.post(
    "/api/reservations/:id",
    jwt.verifyToken,
    restReservation.postReservation
  );
  server.put(
    "/api/reservations/:id",
    jwt.verifyToken,
    restReservation.putReservation
  );
  server.delete(
    "/api/reservations/:id",
    jwt.verifyToken,
    restReservation.deleteReservation
  );
}

function prepareDishPaths() {
  server.get("/api/dishes", restDish.getDishes);
  server.post("/api/dishes", jwt.verifyToken, restDish.postDishes);
  server.put("/api/dishes", jwt.verifyToken, restDish.putDishes);
  server.delete("/api/dishes", jwt.verifyToken, restDish.deleteDishes);

  server.get("/api/dishes/:id", restDish.getDish);
  server.post("/api/dishes/:id", jwt.verifyToken, restDish.postDish);
  server.put("/api/dishes/:id", jwt.verifyToken, restDish.putDish);
  server.delete("/api/dishes/:id", jwt.verifyToken, restDish.deleteDish);
}

function prepareCategoryPaths() {
  server.get("/api/categories", restDish.getCategories);
}

function prepareDrinkPaths() {
  server.get("/api/drinks", restDrink.getDrinks);
  server.post("/api/drinks", jwt.verifyToken, restDrink.postDrinks);
  server.put("/api/drinks", jwt.verifyToken, restDrink.putDrinks);
  server.delete("/api/drinks", jwt.verifyToken, restDrink.deleteDrinks);

  server.get("/api/drinks/:id", restDrink.getDrink);
  server.post("/api/drinks/:id", jwt.verifyToken, restDrink.postDrink);
  server.put("/api/drinks/:id", jwt.verifyToken, restDrink.putDrink);
  server.delete("/api/drinks/:id", jwt.verifyToken, restDrink.deleteDrink);
}

function prepareOrderPaths() {
  server.get("/api/tables", jwt.verifyToken, restOrder.getOrders);
  server.post("/api/tables", jwt.verifyToken, restOrder.postOrders);
  server.put("/api/tables", jwt.verifyToken, restOrder.putOrders);
  server.delete("/api/tables", jwt.verifyToken, restOrder.deleteOrders);

  server.get("/api/tables/:id", jwt.verifyToken, restOrder.getOrder);
  server.post("/api/tables/:id", jwt.verifyToken, restOrder.postOrder);
  server.put("/api/tables/:id", jwt.verifyToken, restOrder.putOrder);
  server.delete("/api/tables/:id", jwt.verifyToken, restOrder.deleteOrder);
}

function prepareOrderDishPaths() {
  server.get("/api/order-dish", jwt.verifyToken, restOrderDish.getOrderDishes);
  server.post(
    "/api/order-dish",
    jwt.verifyToken,
    restOrderDish.postOrderDishes
  );
  server.put("/api/order-dish", jwt.verifyToken, restOrderDish.putOrderDishes);
  server.delete(
    "/api/order-dish",
    jwt.verifyToken,
    restOrderDish.deleteOrderDishes
  );

  server.get(
    "/api/order-dish/:id",
    jwt.verifyToken,
    restOrderDish.getOrderDish
  );
  server.post(
    "/api/order-dish/:id",
    jwt.verifyToken,
    restOrderDish.postOrderDish
  );
  server.put(
    "/api/order-dish/:id",
    jwt.verifyToken,
    restOrderDish.putOrderDish
  );
  server.delete(
    "/api/order-dish/:id",
    jwt.verifyToken,
    restOrderDish.deleteOrderDish
  );
}

function prepareOrderDrinkPaths() {
  server.get(
    "/api/order-drink",
    jwt.verifyToken,
    restOrderDrink.getOrderDrinks
  );
  server.post(
    "/api/order-drink",
    jwt.verifyToken,
    restOrderDrink.postOrderDrinks
  );
  server.put(
    "/api/order-drink",
    jwt.verifyToken,
    restOrderDrink.putOrderDrinks
  );
  server.delete(
    "/api/order-drink",
    jwt.verifyToken,
    restOrderDrink.deleteOrderDrinks
  );

  server.get(
    "/api/order-drink/:id",
    jwt.verifyToken,
    restOrderDrink.getOrderDrink
  );
  server.post(
    "/api/order-drink/:id",
    jwt.verifyToken,
    restOrderDrink.postOrderDrink
  );
  server.put(
    "/api/order-drink/:id",
    jwt.verifyToken,
    restOrderDrink.putOrderDrink
  );
  server.delete(
    "/api/order-drink/:id",
    jwt.verifyToken,
    restOrderDrink.deleteOrderDrink
  );
}

function prepareTablePaths() {
  server.get("/api/tables", jwt.verifyToken, restTable.getTables);
  server.post("/api/tables", jwt.verifyToken, restTable.postTables);
  server.put("/api/tables", jwt.verifyToken, restTable.putTables);
  server.delete("/api/tables", jwt.verifyToken, restTable.deleteTables);

  server.get("/api/tables/:id", jwt.verifyToken, restTable.getTable);
  server.post("/api/tables/:id", jwt.verifyToken, restTable.postTable);
  server.put("/api/tables/:id", jwt.verifyToken, restTable.putTable);
  server.delete("/api/tables/:id", jwt.verifyToken, restTable.deleteTable);
}

startServer();
