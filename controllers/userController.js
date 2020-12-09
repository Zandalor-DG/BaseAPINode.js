const models = require("../database/models");
const tokenChecker = require("../middleware/tokenChecker");
const bcrypt = require("bcryptjs");

const checkValue = (valueCheck, response, method) => {
  if (!valueCheck) {
    response.status(400).json({ message: `no data for ${method}` });
    return;
  }
};

exports.putUser = async (req, res, next) => {
  try {
    tokenChecker(req, res, next);
    const { fullName, email, password, dob, roleId } = req.body;
    if (!fullName && !email && !password && !dob && !roleId) {
      throw new Error("Data put user is not presented");
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
    res.status(200).json({ message: "user update" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  tokenChecker(req, res, next);
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

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  tokenChecker(req, res, next);
  try {
    const allUsers = await models.User.findAll({ raw: true });
    res.json({ message: "All users", allUsers });
  } catch (err) {
    res.status(500);
  }
};
