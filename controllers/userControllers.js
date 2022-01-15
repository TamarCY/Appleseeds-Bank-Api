const express = require("express");
const {
  loadUsers,
  deleteUserFunction,
  addUser,
  updateTransaction
} = require("./utils.js");

const app = express();
app.use(express.json());

const getUsers = (req, res) => {
  try {
    res.status(200).send(loadUsers());
  } catch (e) {
    res.status(400).send("Error");
  }
};

const getUser = (req, res) => {
  try {
    res.status(200).send(loadUsers(req.params.id));
  } catch (e) {
    res.status(400).send("Error");
  }
};

const deleteUser = (req, res) => {
  try {
    res.status(200).send(deleteUser(req.body.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const postUser = (req, res) => {
  console.log("ping");
};
const putUsers = (req, res) => {
  console.log("ping");
};

module.exports = { getUser, getUsers, postUser, putUsers, deleteUser };
