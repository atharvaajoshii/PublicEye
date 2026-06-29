// Atmika

const express = require("express");
const { dashboard, analytics, issues, users, officers, reports, logout } = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/analytics", analytics);
router.get("/issues", issues);
router.get("/users", users);
router.get("/officers", officers);
router.get("/reports", reports);
router.get("/logout", logout);

module.exports = router; 