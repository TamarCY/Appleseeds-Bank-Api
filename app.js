const express = require("express");
const { loadUsers } = require("./utils.js");

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
  //withdraw
  //deposit
  //update credit
  //transfer
});

app.post("/users", (req, res) => {});

app.delete("/users", (req, res) => {});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
