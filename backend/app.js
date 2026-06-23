const express = require("express");
const connectDB = require("./config/db");

const app = express();
const authRoutes = require("./routes/authRoutes");

connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
module.exports = app;

app.listen(5000, () => {
  console.log("Server Running");
});