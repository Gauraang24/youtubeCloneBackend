const express = require("express");
const connectWithDB = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

//Middleware
app.use(bodyParser.json());

//Routers
app.use("/api", authRoutes);

//To connect with mongoDb
connectWithDB();

//To start node server
app.listen(process.env.PORT, () => {
  console.log(`Server is now live on port ${process.env.PORT}`);
});
