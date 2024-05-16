import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const createTokenJWT = function (user) {
  try {
    user = {
      id_user: user.id_user,
      username: user.username,
      role: user.role_id,
    };
    let token = jwt.sign({ user }, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    console.log("TOKEN: ", token);
    console.log("EXPIRES: ", process.env.JWT_EXPIRE);
    return token;
  } catch (error) {
    console.error("TOKEN CREATION ERROR: ", error);
    throw error;
  }
};

const verifyToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("Unauthorized");

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send("Token expired");
      } else {
        return res.status(403).send("Invalid token");
      }
    }
    next();
  });
};

const verifyRole = function (requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
};

export default {
  createTokenJWT,
  verifyToken,
  verifyRole,
};
