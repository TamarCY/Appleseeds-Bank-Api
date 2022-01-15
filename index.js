const express = require ("express");
const userRouter = require ("./routes/user.routes.js")
const app = express();
const PORT = 5000;

app.use(express.json())


app.use("/", userRouter)


app.listen(PORT, ()=>console.log(`Server is up and running on ${PORT}`))