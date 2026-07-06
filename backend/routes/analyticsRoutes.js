// Atmika

const authMiddleware = require("../middleware/authMiddleware");

const express = require("express");
const { analytics } = require("../controllers/analyticsController");

const router = express.Router();

router.use(authMiddleware);

router.get("/analytics", analytics);

module.exports = router; 