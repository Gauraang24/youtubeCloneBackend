const mongoose = require("mongoose");

const connectWithDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGOURL)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error Connecting to MongoDB", err);
      });
  } catch (error) {
    console.log("Error :", error.message);
    process.exit(1);
  }
};

module.exports = connectWithDB;
