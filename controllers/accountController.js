require("dotenv").config();
const bcrypt = require("bcryptjs");
const models = require("../database/models");
const updateTokens = require("../middleware/updateTokens");

exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password, dob } = req.body;
    const candidate = await models.User.findOne({ where: { email: email } });

    if (candidate) {
      throw new Error("Email already used");
    }
    const passwordHash = bcrypt.hashSync(password, 10);

    await models.User.create({
      fullName: fullName,
      email: email,
      password: passwordHash,
      dob: dob,
      roleId: 3,
    });
    res.json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "invalid login data" });

    const user = await models.User.findOne({ where: { email: email } });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "incorrect password" });

    const tokens = await updateTokens(user.id); //проверка токена возможна
    const roleUserAuth = await models.Role.findByPk(user.roleId);

    const userData = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      dob: user.dob,
      role: roleUserAuth.dataValues.name,
    };
    res.json({ userData, tokens });
  } catch (err) {
    res.status(500).json({ message: "server error, please try again" });
  }
};
