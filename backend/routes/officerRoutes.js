// Atmika

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const express = require("express");
const { dashboard, manageIssues, updateIssueStatus, updateIssueProgress, updateVoting } = require("../controllers/officerController");

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["officer"]));

router.get("/dashboard", dashboard);
router.get("/manage-issues", manageIssues);
router.patch("/manage-issues/:id/status", updateIssueStatus);
router.patch("/manage-issues/:id/progress", updateIssueProgress);
router.patch(
    "/:id/voting",
    authMiddleware,
    updateVoting
);

module.exports = router; 