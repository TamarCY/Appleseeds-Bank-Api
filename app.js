// const express = require("express");
// const { loadUsers, deleteUser, addUser, updateTransaction } = require("./controllers/utils.js");

// const app = express();

// const PORT = 3000;

// app.use(express.json());

// app.get("/users", (req, res) => {
//   try {
//     res.status(200).send(loadUsers());
//   } catch (e) {
//     res.status(400).send("Error");
//   }
// });

// app.get("/users/:id", (req, res) => {
//   try {
//     const result = loadUsers(req.params.id);
//     if (!result) {
//       throw "User not found";
//     } else {
//       res.status(200).send(result);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// // app.put("/users/withdraw/:id",(req, res)=>{

// // })

// // app.put("/users/deposit/:id", (req, res)=> {

// // })

// // app.put("/users/credit/:id"(req, res)=> {

// // })

// // app.put("/users/transfer/:id", (req, res)=>{
// //     try{
// //         res.status(200).send("transfer")
// //     } catch(e){
// //         res.status(400).send(e)
// //     }
// // })

// app.put("/users/:id", (req, res) => {
//   console.log(req.body);
//     try{
//         res.status(200).send(updateTransaction(req.body, req.params.id));
//     } catch (e) {
//         res.status(400).send(e)
//     }
// });



<<<<<<< HEAD


// app.put("/users/transfer/:id", (req, res)=>{
=======
// app.post("/users", (req, res) => {
>>>>>>> 8de17fd8fdf685e40767f31eaa996897dcf7ede5
//     try{
//         res.status(201).send(addUser(req.body))
//     } catch (e) {
//         res.status(400).send(e)
//     }
<<<<<<< HEAD
// })

app.put("/users/:id", (req, res) => {
  console.log(req.body);
    try{
        res.status(200).send(updateTransaction(req.body, req.params.id));
    } catch (e) {
        res.status(400).send(e)
    }
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


// This is a comment 
=======
// });

// app.delete("/users", (req, res) => {
//     try {
//         res.status(200).send(deleteUser(req.body.id))
//     } catch (e) {
//         res.status(400).send(e)
//     }
// });

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });
>>>>>>> 8de17fd8fdf685e40767f31eaa996897dcf7ede5


// This is a comment