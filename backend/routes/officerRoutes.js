// Atmika

const express = require("express");
const { dashboard } = require("../controllers/officerController");

const router = express.Router();

router.get("/dashboard/:id", dashboard);

module.exports = router; 