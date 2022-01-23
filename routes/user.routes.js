const express = require("express");
const {getUsers, getUser, postUser, putUsers, deleteUser} = require ("../controllers/userControllers.js")

const userRouter = express.Router();

userRouter.get("/users/:id", getUser);
userRouter.get("/users", getUsers);
userRouter.put("/users/:id", putUsers);
userRouter.post("/users", postUser);
userRouter.delete("/users", deleteUser)


module.exports = userRouter



