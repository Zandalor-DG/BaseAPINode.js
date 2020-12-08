const express = require("express");
const accountController = require("../controllers/accountController");

const accountRouter = express.Router();

accountRouter.post("/signup", accountController.signUp);
accountRouter.post("/signin", accountController.signIn);

module.exports = accountRouter;
