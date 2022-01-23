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
  console.log("delete");
  try {
    res.status(200).send(deleteUserFunction(req.body.id));
  } catch (e) {
    res.status(400).send(e);
  }
};

const postUser = (req, res) => {
  try {
    res.status(201).send(addUser(req.body));
  } catch (e) {
    res.status(400).send(e);
  }
};
const putUsers = (req, res) => {
      try{
        res.status(200).send(updateTransaction(req.body, req.params.id));
    } catch (e) {
        res.status(400).send(e)
    }
};

module.exports = { getUser, getUsers, postUser, putUsers, deleteUser };
