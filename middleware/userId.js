require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    next();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  if (token == "null") {
    next();
    return;
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.type !== "access") {
      next();
      return;
    }
    req.userId = payload.userId;
    next();
  } catch (err) {
    next();
  }
};
