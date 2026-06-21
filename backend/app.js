const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();


app.listen(5000, () => {
  console.log("Server Running");
});