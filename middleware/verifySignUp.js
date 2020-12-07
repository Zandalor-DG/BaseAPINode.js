const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      fullName: req.body.fullName,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Full Name is already in use!",
      });
      return;
    }

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        next();
      }
      res.status(400).sed({
        message: "Failed Email is already in use!",
      });
      return;
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (!req.body.roles) {
    next();
  }
  for (let i = 0; i < req.body.roles.length; i++) {
    if (!ROLES.includes(req.body.roles[i])) {
      res.status(400).send({
        message: "Failed! Role does not exist = " + req.body.roles[i],
      });
      return;
    }
  }
};

const verifySignUp = {
  checkDuplicateUserNameOrEmail: checkDuplicateUserNameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
