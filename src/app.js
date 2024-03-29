const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./users/users.router");
const db = require("./utils/database")
const app = express();

const PORT = process.env.PORT || 3000;

//? Validar la conexión

db.authenticate()
  .then(() => console.log('Database Authenticated!'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database Synced!"))
  .catch((err) => console.log(err))

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Server OK",
    myMessage: process.env.MESSAGE,
    myPort: process.env.PORT,
  });
});

app.use("/", userRouter);

app.listen(3000, () => {
  console.log(`Server started at port ${PORT}`);
});
