// Atmika

const express = require("express");
const { dashboard, analytics, manageIssues, updateIssueStatus } = require("../controllers/officerController");

const router = express.Router();

router.get("/dashboard/:id", dashboard);
router.get("/analytics", analytics);
router.get("/manage-issues/:id", manageIssues);
router.patch("/manage-issues/:id/status", updateIssueStatus);

module.exports = router; 