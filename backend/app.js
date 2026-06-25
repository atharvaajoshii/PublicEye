require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const officerRoutes = require("./routes/officerRoutes");

const app = express();

app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});

app.use(express.json());

connectDB();

app.use("/api/officer", officerRoutes);

app.listen(5000, () => {
    console.log("Server Running");
});