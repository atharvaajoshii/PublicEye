require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const officerRoutes = require("./routes/officerRoutes");
const adminRoutes = require("./routes/adminRoutes");

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
app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});

app.use(express.json());

connectDB();
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
module.exports = app;
app.use("/api/officer", officerRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
    console.log("Server Running");
});