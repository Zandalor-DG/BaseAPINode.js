require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const tokenChecker = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized access." });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = tokenChecker;
