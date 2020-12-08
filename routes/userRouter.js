const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.put("/put", userController.putUser);
userRouter.post("/delete", userController.deleteUser);
userRouter.post("/getall", userController.getAllUsers);

module.exports = userRouter;