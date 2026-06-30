// Atmika

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const express = require("express");
const { dashboard, analytics, manageIssues, updateIssueStatus } = require("../controllers/officerController");

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["officer"]));

router.get("/dashboard", dashboard);
router.get("/analytics", analytics);
router.get("/manage-issues", manageIssues);
router.patch("/manage-issues/:id/status", updateIssueStatus);

module.exports = router; 