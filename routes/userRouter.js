const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.put("/put", userController.putUser);
userRouter.delete("/delete", userController.deleteUser);
userRouter.get("/getall", userController.getAllUsers);

module.exports = userRouter;
