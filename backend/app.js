const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true
}));
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
module.exports = app;

app.listen(5000, () => {
  console.log("Server Running");
});