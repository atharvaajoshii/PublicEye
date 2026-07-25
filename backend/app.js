require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const officerRoutes = require("./routes/officerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const issueRoutes = require("./routes/issueRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const geocodeRoutes = require("./routes/geocodeRoutes");

const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   console.log("Incoming:", req.method, req.url);
//   next();
// });

app.use(express.json());

connectDB();

app.use(cookieParser());

app.use("/api/report", reportRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/officer", officerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/users", userRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/geocode", geocodeRoutes);

//HEALTH ROUTE
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "PublicEye API running",
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;