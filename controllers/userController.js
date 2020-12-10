const models = require("../database/models");
const tokenChecker = require("../middleware/tokenChecker");
const bcrypt = require("bcryptjs");

const checkValue = (valueCheck, method) => {
  if (!valueCheck) {
    throw new Error(`${method} is not presented`);
  }
};

exports.putUser = async (req, res) => {
  try {
    const { fullName, email, password, dob, roleId } = req.body;
    if (!fullName && !email && !password && !dob && !roleId) {
      throw new Error("Full data is not presented");
    }

    models.User.update(
      {
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        dob: dob,
        roleId: roleId,
      },
      { where: { email: email } }
    );
    res.status(200).json({ error: false, message: "user update" });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    checkValue(req.body, res, "deleteUser");
    const { id } = req.body;
    if (!id) {
      throw new Error("Id is not presented");
    }

    models.User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ error: false, message: "User deleted" });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await models.User.findAll({
      raw: true,
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ message: "All users", allUsers });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
