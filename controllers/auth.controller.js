const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  const userRole = Roles.findOne({
    where: { name: "user" },
  }).then(user);

  Users.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    dob: req.body.dob,
    roleId: userRole.id,
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    let userRole = Role.findByPk(user.roleId);

    res
      .status(200)
      .send({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        dob: user.dob,
        roles: userRole.name,
        accessToken: token,
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};
