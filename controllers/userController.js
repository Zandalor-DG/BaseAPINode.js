const models = require("../database/models");

const checkValue = (valueCheck, response, method) => {
  if (!valueCheck) {
    response.status(400).json({ message: `no data for ${method}` });
    return;
  }
};

exports.putUser = async (req, res) => {
  try {
    const newRole = models.Role.findOne({ where: { id: req.body.roleId } });

    if (
      !req.body.fullName ||
      !req.body.email ||
      !req.body.password ||
      !req.body.dob ||
      !newRole.id
    ) {
      throw new Error("Data put user is not presented");
    }

    models.User.update({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      roleId: newRole.id,
    });

    res.json({ message: "User updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
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
        id: req.body.id,
      },
    });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    models.User.findAll({ raw: true }).then((allUsers) => {
      checkValue(allUsers, res, "getAllUsers");
      res.json(allUsers);
    });

    res.json({ message: "All users" });
  } catch (err) {
    res.status(500).json({ message: "server error, please try again", err });
  }
};
