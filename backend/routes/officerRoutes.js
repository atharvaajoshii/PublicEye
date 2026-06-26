// Atmika

const express = require("express");
const { dashboard } = require("../controllers/officerController");
const { analytics } = require("../controllers/officerController");

const router = express.Router();

router.get("/dashboard/:id", dashboard);
router.get("/analytics", analytics);

module.exports = router; 