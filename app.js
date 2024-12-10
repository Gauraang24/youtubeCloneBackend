const express = require("express");
const connectWithDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // Authentication routes
const videoRoutes = require("./routes/videoRoute"); // Video routes

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routers
app.use("/api", authRoutes); // Authentication API
app.use("/api/videos", videoRoutes); // Video API

// Connect to MongoDB
connectWithDB();

// Start Node server
app.listen(process.env.PORT, () => {
  console.log(`Server is now live on port ${process.env.PORT}`);
});
