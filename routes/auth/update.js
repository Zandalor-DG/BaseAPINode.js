require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = require("../../database/models");

const baseUrl = process.env.BASE_URL;
const jwtSecret = process.env.JWT_SECRET;

const updateUserData = async (req, res) => {
  const authHeader = req.get("Authorization");
  const token = authHeader.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token." });
      return;
    }
  }
  const userId = +payload.userId;
  let user;
  try {
    user = await models.User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "user not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  user = {
    id: user.id,
    fullName: user.fullName,
    dob: user.dob,
    roleId: user.roleId,
  };
  res.json(user);
};

module.exports = updateUserData;
