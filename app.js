const express = require("express");
const { loadUsers, deleteUser, addUser, updateUser } = require("./utils.js");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  try {
    res.status(200).send(loadUsers());
  } catch (e) {
    res.status(400).send("Error");
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const result = loadUsers(req.params.id);
    if (!result) {
      throw "User not found";
    } else {
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// app.put("/users/withdraw/:id",(req, res)=>{

// })

// app.put("/users/deposit/:id", (req, res)=> {

// })

// app.put("/users/credit/:id"(req, res)=> {

// })

// app.put("/users/transfer/:id", (req, res)=>{

// })

app.put("/users/:id", (req, res) => {
    try{
        res.status(200).send(updateUser(req.body, req.params.id));
    } catch (e) {
        res.status(400).send(e)
    }
  //withdraw
  //deposit
  //update credit
  //transfer
});



app.post("/users", (req, res) => {
    try{
        res.status(201).send(addUser(req.body))
    } catch (e) {
        res.status(400).send(e)
    }
});

app.delete("/users", (req, res) => {
    try {
        res.status(200).send(deleteUser(req.body.id))
    } catch (e) {
        res.status(400).send(e)
    }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
