import UserDAO from "./userDAO.js";
import env from "dotenv";
import bcrypt from "bcrypt";
import jwt from "../../modules/jwt.js";

env.config();

const restUser = {
  getUsers: async function (req, res) {
    res.type("application/json");
    try {
      let udao = new UserDAO();
      const users = await udao.getAll();
      res.send(JSON.stringify(users));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postUsers: async function (req, res) {
    res.type("application/json");
    try {
      let data = req.body;
      let udao = new UserDAO();
      const users = await udao.insert(data);
      res.send(JSON.stringify(users));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  deleteUsers: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  putUsers: function (req, res) {
    res.type("application/json");
    res.status(501).send(JSON.stringify({ error: "Not implemented" }));
  },

  getUser: async function (req, res) {
    res.type("application/json");
    try {
      let udao = new UserDAO();
      let username = req.params.username;
      const user = await udao.getOne(username);
      res.send(JSON.stringify(user));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  getProfileData: async function (req, res) {
    res.type("application/json");
    try {
      let udao = new UserDAO();
      let id_user = req.params.id_user;
      const user = await udao.getProfileData(id_user);
      res.send(JSON.stringify(user));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  postUser: function (req, res) {
    res.type("application/json");
    res.status(405).send(JSON.stringify({ error: "Method Not Allowed" }));
  },

  deleteUser: async function (req, res) {
    res.type("application/json");
    try {
      let id_user = req.params.id_user;
      let udao = new UserDAO();
      const user = await udao.delete(id_user);
      res.send(JSON.stringify(user));
    } catch (error) {
      console.error(error);
      res.status(500).send(JSON.stringify({ error: "Internal Server Error" }));
    }
  },

  putUser: async function (req, res) {
    try {
      let udao = new UserDAO();
      const id_user = req.params.id_user;
      const data = req.body;
      const user = await udao.update(id_user, data);
      res.send(JSON.stringify(user));
      res.status(201);
    } catch (error) {
      console.log("error: " + error);
      res.status(500);
    }
  },

  registerUser: async function (req, res) {
    const { name, surname, phone, password, email, username } = req.body;
    const user = { name, surname, phone, password, email, username };

    try {
      let udao = new UserDAO();
      const check = await udao.getOne(username);
      console.log("USERNAME: " + username);
      if (check) {
        res.send("Username already exists. Try logging in.");
      } else {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS), async (err, salt) => {
          if (err) {
            console.error("Error generating salt:", err);
            res.status(500).send("Server Error");
            return;
          }
          bcrypt.hash(user.password, salt, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
              res.status(500).send("Server Error");
              return;
            }
            user.password = hash;
            const result = await udao.insert(user);
            res.send(JSON.stringify(result));
            res.status(200);
          });
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Server Error");
    }
  },

  loginUser: async function (req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).send("Username and password are required");
        return;
      }

      let udao = new UserDAO();
      const user = await udao.getOne(username);

      if (!user) {
        res.status(401).send("Invalid username or password");
        return;
      }

      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          res.status(500).send("Internal Server Error");
          return;
        }

        if (result) {
          const token = jwt.createTokenJWT(user);

          //console.log("TOKEN: " + token);
          res.header("Authorization", `Bearer ${token}`).sendStatus(200);
        } else {
          res.status(401).send("Invalid username or password");
        }
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default restUser;
